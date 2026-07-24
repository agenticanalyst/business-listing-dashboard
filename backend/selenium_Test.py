from selenium import webdriver
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("https://www.justdial.com/Jabalpur/Restaurants/nct-10408936?trkid=277-remotecity-fcat-cate&term=&cbflg=")

time.sleep(10)
from selenium.webdriver.common.by import By

restaurants = driver.find_elements(
    By.CSS_SELECTOR,
    "span.resultbox_title_anchor"
)

addresses = driver.find_elements(
    By.CSS_SELECTOR,
    "div.locatcity"
)
phones = driver.find_elements(
    By.CSS_SELECTOR,
    "span.callcontent"
)
print("Total Restaurants:", len(restaurants))
print("Total Addresses:", len(addresses))
print("Total Phones:", len(phones))
data = []

for i in range(min(len(restaurants), len(addresses), len(phones))):
    data.append({
    "Business Name": restaurants[i].text,
    "Address": addresses[i].text,
    "Phone": phones[i].text
})

    print("----------------------------")
    print("Restaurant :", restaurants[i].text)
    print("Address    :", addresses[i].text)
    print("Phone      :", phones[i].text)
print(driver.title)
df = pd.DataFrame(data)

df.to_csv("restaurants.csv", index=False)

print("CSV File Saved Successfully ✅")

input("Press Enter to close...")

driver.quit()

