import pandas as pd
import json
import os
import re

data_dir = "data"
output_dir = "public/data"
os.makedirs(output_dir, exist_ok=True)

# ============================================================
# 1. COMPANIES DATA
# ============================================================
all_companies = []

for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    company_file = None
    for f in os.listdir(year_dir):
        if 'compan' in f.lower():
            company_file = os.path.join(year_dir, f)
            break
    
    if not company_file:
        continue
    
    df = pd.read_excel(company_file, header=None)
    
    # Find header row (contains 'Employer' or company name column)
    header_row = None
    for i, row in df.iterrows():
        row_str = ' '.join([str(v) for v in row.values if pd.notna(v)])
        if 'employer' in row_str.lower() or 'grand total' in row_str.lower():
            if 'employer' in row_str.lower():
                header_row = i
                break
    
    if header_row is None:
        # Try different approach for older formats
        for i, row in df.iterrows():
            if any('Employer' in str(v) for v in row.values if pd.notna(v)):
                header_row = i
                break
    
    if header_row is not None:
        df.columns = df.iloc[header_row]
        df = df.iloc[header_row + 1:]
    
    # Find the employer name column and total column
    name_col = None
    total_col = None
    for col in df.columns:
        col_str = str(col).lower()
        if 'employer' in col_str:
            name_col = col
        elif 'grand total' in col_str or col_str == 'total':
            total_col = col
    
    if name_col is None:
        # For 2019 format - use column index
        cols = list(df.columns)
        if len(cols) >= 5:
            name_col = cols[4] if pd.isna(cols[4]) or 'Employer' in str(cols[4]) else cols[-1]
            total_col = cols[3] if pd.isna(cols[3]) else cols[1]
    
    if name_col is None:
        print(f"  Could not find employer column for {year}")
        continue

    for _, row in df.iterrows():
        name = row.get(name_col)
        if pd.isna(name) or not isinstance(name, str) or name.strip() == '':
            continue
        name = name.strip()
        if name.lower() in ['grand total', 'jan - dec', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']:
            continue
        
        # Get total - try different column names
        total = 0
        if total_col and pd.notna(row.get(total_col)):
            total = int(row[total_col]) if pd.notna(row[total_col]) else 0
        else:
            # Try to find any numeric column that looks like a total
            for col_name in ['Grand Total', 'Permits Issued Grand Total', 'Total']:
                if col_name in df.columns and pd.notna(row.get(col_name)):
                    total = int(row[col_name])
                    break

        if total > 0:
            all_companies.append({
                "name": name,
                "year": year,
                "permits": total
            })

print(f"Companies records: {len(all_companies)}")

# ============================================================
# 2. COUNTY DATA
# ============================================================
all_counties = []

for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    county_file = None
    for f in os.listdir(year_dir):
        if 'county' in f.lower():
            county_file = os.path.join(year_dir, f)
            break
    
    if not county_file:
        continue
    
    df = pd.read_excel(county_file, header=None)
    
    # Find data rows - look for county names
    counties_known = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Donegal', 
                      'Kildare', 'Meath', 'Wicklow', 'Wexford', 'Kilkenny', 'Tipperary',
                      'Clare', 'Mayo', 'Sligo', 'Louth', 'Westmeath', 'Offaly', 'Laois',
                      'Cavan', 'Monaghan', 'Roscommon', 'Longford', 'Leitrim', 'Carlow']
    
    for i, row in df.iterrows():
        for v in row.values:
            if isinstance(v, str) and v.strip() in counties_known:
                county = v.strip()
                # Get numeric values from this row
                nums = [x for x in row.values if isinstance(x, (int, float)) and pd.notna(x) and x > 0]
                if nums:
                    issued = int(nums[0]) if len(nums) >= 1 else 0
                    refused = int(nums[1]) if len(nums) >= 2 else 0
                    withdrawn = int(nums[2]) if len(nums) >= 3 else 0
                    all_counties.append({
                        "county": county,
                        "year": year,
                        "issued": issued,
                        "refused": refused,
                        "withdrawn": withdrawn
                    })
                break

print(f"County records: {len(all_counties)}")

# ============================================================
# 3. NATIONALITY DATA
# ============================================================
all_nationalities = []

for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    nat_file = None
    for f in os.listdir(year_dir):
        if 'nationality' in f.lower():
            nat_file = os.path.join(year_dir, f)
            break
    
    if not nat_file:
        continue
    
    df = pd.read_excel(nat_file, header=None)
    
    for i, row in df.iterrows():
        vals = list(row.values)
        # Look for rows where there's a string that looks like a country name
        # and numeric values
        nationality = None
        for v in vals:
            if isinstance(v, str) and v.strip() not in ['', 'Year', 'Nationality', 'New', 'Renewal', 
                                                          'Total', 'Refused', 'Withdrawn', 'Issued',
                                                          'Grand Total', 'Jan - Dec', 'Nationality\xa0']:
                if not v.strip().startswith('Jan') and not v.strip().startswith('Feb'):
                    nationality = v.strip()
                    break
        
        if nationality and len(nationality) > 1:
            nums = [x for x in vals if isinstance(x, (int, float)) and pd.notna(x)]
            if nums and max(nums) > 0:
                # For newer format (2024+): Issued, Refused
                # For older format: New, Renewal, Total, Refused, Withdrawn
                if len(nums) >= 3:
                    # Take the largest as total/issued
                    issued = int(max(nums))
                    refused = int(nums[-2]) if len(nums) >= 2 else 0
                    withdrawn = int(nums[-1]) if len(nums) >= 3 and nums[-1] != max(nums) else 0
                elif len(nums) == 2:
                    issued = int(nums[0])
                    refused = int(nums[1])
                    withdrawn = 0
                else:
                    issued = int(nums[0])
                    refused = 0
                    withdrawn = 0
                
                all_nationalities.append({
                    "nationality": nationality,
                    "year": year,
                    "issued": issued
                })

print(f"Nationality records: {len(all_nationalities)}")

# ============================================================
# 4. SECTOR DATA
# ============================================================
all_sectors = []

for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    sector_file = None
    for f in os.listdir(year_dir):
        if 'sector' in f.lower():
            sector_file = os.path.join(year_dir, f)
            break
    
    if not sector_file:
        continue
    
    df = pd.read_excel(sector_file, header=None)
    
    for i, row in df.iterrows():
        vals = list(row.values)
        sector = None
        for v in vals:
            if isinstance(v, str) and len(v.strip()) > 3:
                v_clean = v.strip()
                if v_clean.lower() not in ['year', 'month', 'sector', 'economic sector', 'new', 
                                            'renewal', 'total', 'refused', 'withdrawn', 'issued',
                                            'grand total', 'jan - dec', 'no sector entered']:
                    if any(c.isalpha() for c in v_clean) and not re.match(r'^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$', v_clean):
                        sector = v_clean
                        break
        
        if sector:
            nums = [x for x in vals if isinstance(x, (int, float)) and pd.notna(x)]
            if nums:
                total = int(max(nums)) if max(nums) > 0 else 0
                if total > 0:
                    all_sectors.append({
                        "sector": sector,
                        "year": year,
                        "permits": total
                    })

print(f"Sector records: {len(all_sectors)}")

# ============================================================
# Save all data
# ============================================================
with open(os.path.join(output_dir, "companies.json"), "w") as f:
    json.dump(all_companies, f)

with open(os.path.join(output_dir, "counties.json"), "w") as f:
    json.dump(all_counties, f)

with open(os.path.join(output_dir, "nationalities.json"), "w") as f:
    json.dump(all_nationalities, f)

with open(os.path.join(output_dir, "sectors.json"), "w") as f:
    json.dump(all_sectors, f)

# Quick summary
print(f"\nSummary:")
print(f"  Companies: {len(all_companies)} records, {len(set(c['name'] for c in all_companies))} unique companies")
print(f"  Counties: {len(all_counties)} records, {len(set(c['county'] for c in all_counties))} unique counties")
print(f"  Nationalities: {len(all_nationalities)} records, {len(set(n['nationality'] for n in all_nationalities))} unique nationalities")
print(f"  Sectors: {len(all_sectors)} records, {len(set(s['sector'] for s in all_sectors))} unique sectors")

# Show top companies by total permits
from collections import defaultdict
company_totals = defaultdict(int)
for c in all_companies:
    company_totals[c['name']] += c['permits']
top_companies = sorted(company_totals.items(), key=lambda x: -x[1])[:10]
print(f"\nTop 10 companies by total permits:")
for name, total in top_companies:
    print(f"  {name}: {total}")
