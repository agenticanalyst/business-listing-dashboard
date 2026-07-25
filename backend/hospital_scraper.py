from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import pandas as pd

# Chrome Driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Hospital Page
driver.get("https://www.justdial.com/Jabalpur/Hospitals/nct-10253670")

time.sleep(5)

# Auto Scroll
last_height = driver.execute_script("return document.body.scrollHeight")

for _ in range(30):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)

    new_height = driver.execute_script("return document.body.scrollHeight")

    if new_height == last_height:
        break

    last_height = new_height

# Scrape Data
hospitals = driver.find_elements(
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

print("Total Hospitals:", len(hospitals))
print("Total Addresses:", len(addresses))
print("Total Phones:", len(phones))

data = []

for i in range(min(len(hospitals), len(addresses), len(phones))):
    data.append({
        "Business Name": hospitals[i].text,
        "Category": "Hospital",
        "City": "Jabalpur",
        "Address": addresses[i].text,
        "Phone": phones[i].text,
        "Source": "Justdial"
    })

    print("----------------------------")
    print("Hospital :", hospitals[i].text)
    print("Address  :", addresses[i].text)
    print("Phone    :", phones[i].text)

# Save CSV
df = pd.DataFrame(data)
df.to_csv("hospitals.csv", index=False)

print("Hospital CSV Saved Successfully ✅")

input("Press Enter to close...")
driver.quit()