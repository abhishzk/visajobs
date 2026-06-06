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

SKIP_NAMES = {'grand total', 'jan - dec', 'jan', 'feb', 'mar', 'apr', 'may',
              'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'total',
              'issued', 'employer name', ''}

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
    rows = df.values.tolist()
    ncols = df.shape[1]
    year_count = 0

    # Detect format by examining first 5 rows
    # Find: which column has company names, which has the grand total,
    # and which row does data start at.
    name_col_idx = None
    total_col_idx = None
    data_start = 0

    # Strategy: find the header row containing 'Employer Name' in first 5 rows
    header_row_idx = None
    for i in range(min(5, len(rows))):
        for j, val in enumerate(rows[i]):
            if isinstance(val, str) and 'employer' in val.lower().strip():
                header_row_idx = i
                name_col_idx = j
                break
        if header_row_idx is not None:
            break

    if header_row_idx is not None:
        # Found header — look for Grand Total column in that row
        for j, val in enumerate(rows[header_row_idx]):
            if isinstance(val, str) and 'grand total' in val.lower():
                total_col_idx = j
                break
        # If no Grand Total label in header (2020-2023: col 1 is NaN but holds totals)
        if total_col_idx is None:
            # Check if col 1 header is NaN and the Grand Total data row has a big number there
            for i in range(header_row_idx + 1, min(header_row_idx + 3, len(rows))):
                if isinstance(rows[i][name_col_idx], str) and 'grand total' in rows[i][name_col_idx].lower():
                    # This is the summary row — col 1 should have the yearly total
                    for j in range(ncols):
                        if j != name_col_idx and isinstance(rows[i][j], (int, float)) and not pd.isna(rows[i][j]):
                            val = rows[i][j]
                            # The grand total is typically the largest number in this row
                            all_nums = [rows[i][k] for k in range(ncols) if isinstance(rows[i][k], (int, float)) and not pd.isna(rows[i][k])]
                            if val == max(all_nums):
                                total_col_idx = j
                                break
                    break
        # Data starts after header, skip the Grand Total summary row
        data_start = header_row_idx + 1
    else:
        # No 'Employer Name' header found (e.g. 2025)
        # Check if last column header says 'Grand Total'
        for j in range(ncols - 1, -1, -1):
            val = rows[0][j] if len(rows) > 0 else None
            if isinstance(val, str) and 'grand total' in val.lower():
                total_col_idx = j
                break
        # Company names are in col 0
        name_col_idx = 0
        data_start = 1  # Row 0 is header-like

    # For 2019 format (5 cols): name in col with 'Employer Name' header,
    # total is the numeric value in the same row
    # Already handled if header was found

    if name_col_idx is None:
        print(f"  WARNING: Could not detect format for {year}, skipping")
        continue

    print(f"  {year}: name_col={name_col_idx}, total_col={total_col_idx}, data_start={data_start}, shape={df.shape}")

    for i in range(data_start, len(rows)):
        row = rows[i]
        name = row[name_col_idx]
        if not isinstance(name, str) or pd.isna(name):
            continue
        name = name.strip()
        if name.lower() in SKIP_NAMES:
            continue

        total = 0
        if total_col_idx is not None:
            val = row[total_col_idx]
            if isinstance(val, (int, float)) and not pd.isna(val):
                total = int(val)

        # Fallback: sum all numeric values in the row (excluding the name column)
        if total == 0:
            row_sum = 0
            for j in range(ncols):
                if j == name_col_idx:
                    continue
                val = row[j]
                if isinstance(val, (int, float)) and not pd.isna(val) and val > 0:
                    row_sum += int(val)
            total = row_sum

        if total > 0:
            all_companies.append({
                "name": name,
                "year": year,
                "permits": total
            })
            year_count += 1

    print(f"  {year}: {year_count} companies parsed")

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
# 5. COMPANY-TO-SECTOR MAPPING
# ============================================================
company_sectors = {}  # {company_name: set(sectors)}
company_counties = {}  # {company_name: set(counties)}

# Extract from sector files
for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    sector_file = None
    for f in os.listdir(year_dir):
        if 'sector' in f.lower():
            sector_file = os.path.join(year_dir, f)
            break

    if not sector_file:
        continue

    try:
        df = pd.read_excel(sector_file, header=None)
        current_sector = None

        for i, row in df.iterrows():
            vals = list(row.values)

            # Detect sector name (first column, non-numeric)
            if vals and isinstance(vals[0], str) and vals[0].strip():
                v_clean = vals[0].strip()
                if v_clean.lower() not in ['sector', 'economic sector', 'grand total', 'jan - dec', 'no sector entered', 'total']:
                    if any(c.isalpha() for c in v_clean):
                        current_sector = v_clean

            # Look for company names (string followed by numbers)
            if current_sector and len(vals) > 1:
                company_name = None
                if isinstance(vals[0], str):
                    v_clean = vals[0].strip()
                    if v_clean and v_clean.lower() not in ['sector', 'economic sector', 'grand total', 'jan - dec'] and len(v_clean) > 2:
                        if current_sector and v_clean != current_sector:  # Not the sector header
                            company_name = v_clean

                if company_name and any(isinstance(v, (int, float)) and v > 0 for v in vals[1:]):
                    if company_name not in company_sectors:
                        company_sectors[company_name] = set()
                    company_sectors[company_name].add(current_sector)
    except Exception as e:
        print(f"  Warning: Could not parse sector file for {year}: {e}")

# Extract from county files
for year in range(2019, 2027):
    year_dir = os.path.join(data_dir, str(year))
    county_file = None
    for f in os.listdir(year_dir):
        if 'county' in f.lower():
            county_file = os.path.join(year_dir, f)
            break

    if not county_file:
        continue

    try:
        df = pd.read_excel(county_file, header=None)
        current_county = None
        counties_known = ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Donegal',
                          'Kildare', 'Meath', 'Wicklow', 'Wexford', 'Kilkenny', 'Tipperary',
                          'Clare', 'Mayo', 'Sligo', 'Louth', 'Westmeath', 'Offaly', 'Laois',
                          'Cavan', 'Monaghan', 'Roscommon', 'Longford', 'Leitrim', 'Carlow']

        for i, row in df.iterrows():
            vals = list(row.values)

            # Detect county name
            for v in vals:
                if isinstance(v, str) and v.strip() in counties_known:
                    current_county = v.strip()
                    break

            # Look for company names in this county section
            if current_county and vals and isinstance(vals[0], str):
                company_name = vals[0].strip()
                if company_name and company_name.lower() not in ['county', 'grand total', 'jan - dec'] and len(company_name) > 2:
                    if any(isinstance(v, (int, float)) and v > 0 for v in vals[1:]):
                        if company_name not in company_counties:
                            company_counties[company_name] = set()
                        company_counties[company_name].add(current_county)
    except Exception as e:
        print(f"  Warning: Could not parse county file for {year}: {e}")

print(f"Company-sector mappings: {len(company_sectors)}")
print(f"Company-county mappings: {len(company_counties)}")

# ============================================================
# 5. SAVE ALL DATA
# ============================================================
with open(os.path.join(output_dir, "companies.json"), "w") as f:
    # Enrich company data with sectors and counties
    enriched_companies = []
    for company in all_companies:
        enriched_companies.append({
            **company,
            "sectors": list(company_sectors.get(company['name'], [])),
            "counties": list(company_counties.get(company['name'], []))
        })
    json.dump(enriched_companies, f)

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
