
# GoingViral - An Explosive Project

## Summary

Could there be a better way to handle the vaccination of the US to slow spread, reduce mortality and hinder virus mutation rates, by simply changing our 
approach to how and who we vaccinate? As of the past few weeks, we managed great success over the coronavirus in targeting the most susceptible demographic
and getting them vaccinated, but are we slowing down the virus as much as we could be? There is now fear of mutated variants that could reset us back to square
one, as virologists are calling this now a "race against the virus". 

Our team is going to examine flu viral case load/concentrations from the years 2016 to 2019 for all 50 states and Washington D.C. 
and measure the congruence of metrics such as GDP, PCI, population density, and the percentage of the population uninsured and how these metrics impact the viral 
concentrations for each state. The model will predict the most susceptible populations to influenza infections, and perhaps propose a new approach 
to the target population we are vaccinating.



The **Let's Go Viral** team is composed of the following people:
1. Matt Kaufmann
2. Ryan Lindsey
3. Jessica Dafler
4. Patrick Ekanga.

### Interesting Notes

The initial spark for the idea of this project came firstly out of my interest in public health as I come from a toxicology background and my teammates having 
backgrounds in engineering, finance, and tech, combined with the burning curiosity of "could we better handle the race against the current pandemic?" We wanted to 
look at how viruses spread, and what could have caused this one to spread like wildfire? Of course, one of the most dangerous aspects of a virus is its ability to 
rapidly mutate, which can only happen inside of a host. When the virus hijacks your lung tissue and creates many copies of itself, small mutations in the virus RNA 
cause this virus to be slightly different from the one that infected you. If this happens enough times (AKA enough infections occur) you may occasionally get a 
strain of the virus far more aggressive and virulent.

When you look at it from this perspective, the approach of vaccinating the most susceptible to complications first, rather than the most susceptible to infection, 
may actually be doing more harm than good. This is the question we are setting out to solve, who are these people most susceptible to the virus?

## Data Sets

### Flu Data


+ As of now, we have secured a great resource on influenza data from the past 10 years in all 50 states across the USA. This data is coming from the CDC's FluView 
Interactive application: https://gis.cdc.gov/grasp/fluview/fluportaldashboard.html 

### Socioeconomic metrics

+  For GDP (gross domestic product) I have sourced an excel spreadsheet containing GDP of every county in every state from the past 3 years. The link to the website 
is https://www.bea.gov/data/gdp/gdp-county-metro-and-other-areas.

+ For PCI (per capita income) the data source used was a combination of per state csv files combined to create a dataset to reflect the annual medial personal income per state. Source: https://fred.stlouisfed.org/release?rid=110

+ For population density, I have sourced CSV files for both total square mileage per county, as well as population in CSV files, and will need some further ETL to
convert to population density per county. In case we decide to scale up, I have also included the same information on a statewide scale.

+ For uninsured percentages by state, the CSV files for health coverage status and type of coverage measured by state. Provided by the  United States Census Bureau at https://www.census.gov/library/publications/2020/demo/p60-271.html

## Technologies


While we'll maintain an open mind about the tools that will best suit us in our data journey, we do have an idea of what will be needed to at least execute our 
desired goal.

**Programming Languages**

+ We will definitely use Python for all statistical analysis, data cleaning, and ML model training. While R is great for statistics, libraries such as SciPy, NumPy,
and even Matplotlib are so well integrated, as well as Pandas, that for the sake of work flow, we'll stick to Python.

+ Secondly we'll use Javascript, as this will open up Leaflet.js to us as well as Plotly.

**Databases**

+ I do believe that for the sake of being able to do joins, relate primary and foreign keys, an SQL databases like Postgres will serve our needs best. The database is hosted in DBeaver:
<img src="ER_Diagram.png" alt="ER_Diagram">

**Machine Learning Models**

+ This is a multi-factorial problem, as we'll be looking at how viral concentration corresponds to the factors mentioned above; we may as well
need to use some resampling techniques if influenza rates are far too low compared to total population. Linear (Single and Multiple) Regression shows that no independent variable can predict viral concentration. The Random Forest Regression and K clustering is being used to test cross validation and explore the variety of variables with no obvious groupings. 

**Data Visualization**

+ We may take advantage of Leaflet.js to create heatmaps, which would be a great visualization tool to see where exactly the highest concetrations are, as well
as being able to see GDP, PCI, population density overlaying those maps. For our final presentation we'll use Tableau.

## Communication

Our team will be communicating through Slack, keeping track of tasks through Trello , and hold face to face meetings through Zoom.
