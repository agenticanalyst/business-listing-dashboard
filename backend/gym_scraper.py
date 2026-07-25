from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import pandas as pd

# Chrome Driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Gym Page
driver.get("https://www.justdial.com/Bhopal/Gyms")

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
gyms = driver.find_elements(
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

print("Total Gyms:", len(gyms))
print("Total Addresses:", len(addresses))
print("Total Phones:", len(phones))

data = []

for i in range(min(len(gyms), len(addresses), len(phones))):
    data.append({
        "Business Name": gyms[i].text,
        "Category": "Gym",
        "City": "Bhopal",
        "Address": addresses[i].text,
        "Phone": phones[i].text,
        "Source": "Justdial"
    })

    print("----------------------------")
    print("Gym :", gyms[i].text)
    print("Address :", addresses[i].text)
    print("Phone :", phones[i].text)

# Save CSV
df = pd.DataFrame(data)
df.to_csv("gyms.csv", index=False)

print("Gyms CSV Saved Successfully ✅")

input("Press Enter to close...")
driver.quit()