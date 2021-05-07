CREATE TABLE happiness_data (
    country VARCHAR(200)   NOT NULL,
    happiness_rank INT   NOT NULL,
    happiness_score FLOAT   NOT NULL,
    economy_gdp_per_capita FLOAT   NOT NULL,
    health_life_expectancy FLOAT   NOT NULL,
    freedom FLOAT   NOT NULL,
    trust_government_corruption FLOAT   NOT NULL,
    generosity FLOAT   NOT NULL,
    year INT   NOT NULL,
    CONSTRAINT ck_happiness_data PRIMARY KEY (
        country, year
     )
);

CREATE TABLE avg_Temp (
    country VARCHAR(200)   NOT NULL,
    yearly_average_temp VARCHAR(200)   NOT NULL,
    CONSTRAINT pk_avg_temp PRIMARY KEY (
        country
     )
);


-- Copying data from CSV --
COPY happiness_data(country, happiness_rank, happiness_score, economy_gdp_per_capita, health_life_expectancy, freedom, trust_government_corruption, generosity, year)
FROM 'C:\Temp\happinessData.csv'
DELIMITER ','
CSV HEADER;

COPY avg_Temp(country, yearly_average_temp)
FROM 'C:\Temp\avTempData.csv'
DELIMITER ','
CSV HEADER;

-- Now alter tables
ALTER TABLE happiness_Data ADD CONSTRAINT fk_happiness_Data_Country FOREIGN KEY(country)
REFERENCES avg_Temp (country);

SELECT * FROM public.avg_temp where country LIKE '%Macedonia%'

SELECT * FROM public.happiness_data where country LIKE '%Macedonia%'
