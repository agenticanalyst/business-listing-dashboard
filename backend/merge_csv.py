import pandas as pd
import glob

csv_files = glob.glob("Buisness listing CSV/*.csv")
print(csv_files)

df_list = []

for file in csv_files:
    df = pd.read_csv(file)
    df_list.append(df)

merged_df = pd.concat(df_list, ignore_index=True)
merged_df.drop_duplicates(inplace=True)

merged_df.to_csv("business_listings.csv", index=False)

print("Total Records:", len(merged_df))
print("Merged Successfully!")