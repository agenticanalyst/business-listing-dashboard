import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://quotes.toscrape.com/"
response = requests.get(url)
print(response.status_code)

soup = BeautifulSoup(response.text, "html.parser")
print(soup.title.text)

# quote = soup.find("span", class_="text")
# print(quote.text)

quotes = soup.find_all("span", class_="text")

for quote in quotes:
    print(quote.text)

quote_list = []

for quote in quotes:
    quote_list.append(quote.text)

df = pd.DataFrame(quote_list, columns=["Quote"])

df.to_csv("quotes.csv", index=False)

print("CSV File Created Successfully!")

