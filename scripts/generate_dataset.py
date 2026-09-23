import json
import random
import os

random.seed(42)

# Curated High-Resolution Unsplash Architecture & Luxury Real Estate Photos
PHOTOS = {
    "penthouse": [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80"
    ],
    "condo": [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1600&q=80"
    ],
    "gcb": [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80"
    ],
    "waterfront": [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80"
    ],
    "commercial": [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80"
    ],
    "shophouse": [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ]
}

# 15 Prestigious Developers
DEVELOPERS = [
    {
        "id": "DEV001",
        "name": "CapitaLand",
        "founded": 2000,
        "headquarters": "Singapore",
        "description": "One of Asia's largest diversified real estate groups, renowned for iconic landmark developments such as Marina One and Sky Habitat.",
        "iconic_projects": ["Marina One Residences", "Sky Habitat", "d'Leedon", "One Pearl Bank"],
        "rating": 4.9,
        "total_projects": 48
    },
    {
        "id": "DEV002",
        "name": "City Developments Limited (CDL)",
        "founded": 1963,
        "headquarters": "Singapore",
        "description": "Singapore pioneer developer with over six decades of shaping the luxury skyline, including Boulevard 88 and South Beach Residences.",
        "iconic_projects": ["Boulevard 88", "South Beach Residences", "Cuscaden Reserve", "Irwell Hill Residences"],
        "rating": 4.9,
        "total_projects": 52
    },
    {
        "id": "DEV003",
        "name": "GuocoLand",
        "founded": 1976,
        "headquarters": "Singapore",
        "description": "Master of integrated mixed-use mega developments and ultra-luxury sky residences, including Wallich Residence at Guoco Tower.",
        "iconic_projects": ["Wallich Residence", "Midtown Modern", "Midtown Bay", "Martin Modern"],
        "rating": 4.8,
        "total_projects": 34
    },
    {
        "id": "DEV004",
        "name": "Pontiac Land Group",
        "founded": 1961,
        "headquarters": "Singapore",
        "description": "Privately-held luxury developer known for architectural masterworks, collaborating with Pritzker Prize laureates like Foster + Partners.",
        "iconic_projects": ["The Colonnade", "Ardmore Park", "The Ritz-Carlton Residences", "Millenia Tower"],
        "rating": 5.0,
        "total_projects": 18
    },
    {
        "id": "DEV005",
        "name": "SC Global Developments",
        "founded": 1996,
        "headquarters": "Singapore",
        "description": "The quintessential creator of ultra-luxury bespoke residences in Singapore, defining the highest echelon of craftsmanship and exclusivity.",
        "iconic_projects": ["The Marq on Paterson Hill", "Sculptura Ardmore", "Hilltops", "Petit Jervois"],
        "rating": 5.0,
        "total_projects": 16
    },
    {
        "id": "DEV006",
        "name": "Frasers Property",
        "founded": 1963,
        "headquarters": "Singapore",
        "description": "Global investor and developer committed to inspiring spaces and sustainable living across prime Singapore residential districts.",
        "iconic_projects": ["Rivière", "Corals at Keppel Bay", "Seaside Residences", "North Park Residences"],
        "rating": 4.7,
        "total_projects": 41
    },
    {
        "id": "DEV007",
        "name": "Far East Organization",
        "founded": 1960,
        "headquarters": "Singapore",
        "description": "Singapore's largest private property developer with hundreds of premier residential, commercial, and hospitality properties.",
        "iconic_projects": ["One Holland Village", "Parkshore", "The Scotts Tower", "Alana"],
        "rating": 4.8,
        "total_projects": 85
    },
    {
        "id": "DEV008",
        "name": "Wing Tai Asia",
        "founded": 1955,
        "headquarters": "Singapore",
        "description": "Acclaimed for timeless architectural elegance and bespoke residences across prime Districts 9, 10, and 11.",
        "iconic_projects": ["Le Nouvel Ardmore", "The Crest", "The Garden Residences", "Belle Vue Residences"],
        "rating": 4.9,
        "total_projects": 29
    },
    {
        "id": "DEV009",
        "name": "UOL Group",
        "founded": 1963,
        "headquarters": "Singapore",
        "description": "Renowned for architectural excellence, biophilic design, and multi-award winning developments including Meyer Mansion and Avenue South.",
        "iconic_projects": ["Meyer Mansion", "Avenue South Residence", "Amber 45", "The Tre Ver"],
        "rating": 4.8,
        "total_projects": 38
    },
    {
        "id": "DEV010",
        "name": "Keppel Land",
        "founded": 1890,
        "headquarters": "Singapore",
        "description": "Pioneering waterfront master-planner, responsible for the world-celebrated Keppel Bay precinct designed by Daniel Libeskind.",
        "iconic_projects": ["Reflections at Keppel Bay", "Corals at Keppel Bay", "Caribbean at Keppel Bay", "19 Nassim"],
        "rating": 4.8,
        "total_projects": 33
    },
    {
        "id": "DEV011",
        "name": "Bukit Sembawang Estates",
        "founded": 1967,
        "headquarters": "Singapore",
        "description": "Distinguished builder of prestigious landed homes and luxury boutique condominiums across Singapore.",
        "iconic_projects": ["8 St Thomas", "Pollux Residences", "The Atelier", "Luxus Hills"],
        "rating": 4.7,
        "total_projects": 22
    },
    {
        "id": "DEV012",
        "name": "Shun Tak Holdings",
        "founded": 1972,
        "headquarters": "Hong Kong / Singapore",
        "description": "Bespoke luxury developer catering to ultra-high-net-worth global clientele with private sanctuaries in Tanglin and Nassim.",
        "iconic_projects": ["Les Maisons Nassim", "Park Nova", "High Street Centre"],
        "rating": 4.9,
        "total_projects": 12
    },
    {
        "id": "DEV013",
        "name": "IOI Properties",
        "founded": 1975,
        "headquarters": "Singapore / Malaysia",
        "description": "Leading regional real estate group behind transformative Grade A commercial towers and Marina View luxury residences.",
        "iconic_projects": ["IOI Central Boulevard Towers", "Marina View Residences", "South Beach"],
        "rating": 4.6,
        "total_projects": 19
    },
    {
        "id": "DEV014",
        "name": "Hongkong Land",
        "founded": 1889,
        "headquarters": "Hong Kong / Singapore",
        "description": "Pre-eminent luxury developer and landlord in prime CBDs across Asia, co-developing iconic landmarks in Marina Bay.",
        "iconic_projects": ["Marina Bay Residences", "Marina Bay Financial Centre", "One Raffles Quay"],
        "rating": 4.9,
        "total_projects": 24
    },
    {
        "id": "DEV015",
        "name": "KOP Properties",
        "founded": 2006,
        "headquarters": "Singapore",
        "description": "Boutique purveyor of high-concept luxury lifestyles and ultra-prime residences including The Hamilton Scotts.",
        "iconic_projects": ["The Hamilton Scotts", "Reignwood Hamilton Scotts", "Montigo"],
        "rating": 4.7,
        "total_projects": 14
    }
]

# 20 Prime Singapore Locations
LOCATIONS = [
    {
        "name": "Marina Bay",
        "district": "D01",
        "zone": "Core Central Region (CCR)",
        "tagline": "The Crown Jewel of Singapore's Financial Skyline",
        "description": "World-famous waterfront living offering front-row vistas of Marina Bay Sands, the Singapore Flyer, and Singapore GP night race.",
        "avg_psf": 3450,
        "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2838,
        "lng": 103.8591
    },
    {
        "name": "Tanjong Pagar",
        "district": "D02",
        "zone": "Core Central Region (CCR)",
        "tagline": "Dynamic Blend of Heritage Shophouses & Sky-High Penthouses",
        "description": "Singapore's thriving CBD enclave with Michelin dining, historic architecture, and the nation's tallest residential tower.",
        "avg_psf": 3100,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2764,
        "lng": 103.8448
    },
    {
        "name": "Sentosa Cove",
        "district": "D04",
        "zone": "Core Central Region (CCR)",
        "tagline": "Singapore's Only Oceanfront Playground for Billionaires",
        "description": "Exclusive marina living with private superyacht berths, championship golf courses, and private island mansions.",
        "avg_psf": 2680,
        "image": "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2460,
        "lng": 103.8415
    },
    {
        "name": "Orchard",
        "district": "D09",
        "zone": "Core Central Region (CCR)",
        "tagline": "Asia's Premier Luxury Shopping & Haute Living Boulevard",
        "description": "Steeped in prestige, Orchard Road is home to flagship luxury boutiques, five-star hospitality, and elite private condominiums.",
        "avg_psf": 3650,
        "image": "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3048,
        "lng": 103.8318
    },
    {
        "name": "River Valley",
        "district": "D09",
        "zone": "Core Central Region (CCR)",
        "tagline": "Cosmopolitan Riverside Living by Robertson Quay",
        "description": "Vibrant riverfront promenade offering tranquil luxury homes moments away from Orchard and the Central Business District.",
        "avg_psf": 2850,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2942,
        "lng": 103.8340
    },
    {
        "name": "Tanglin & Nassim",
        "district": "D10",
        "zone": "Core Central Region (CCR)",
        "tagline": "The Most Prestigious Address in Southeast Asia",
        "description": "Lush embassy row and Singapore's premier Good Class Bungalow enclave bordering the UNESCO World Heritage Botanic Gardens.",
        "avg_psf": 4500,
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3075,
        "lng": 103.8180
    },
    {
        "name": "Bukit Timah",
        "district": "D10",
        "zone": "Core Central Region (CCR)",
        "tagline": "Lush Greenery, Elite Academic Belt & Sprawling Estates",
        "description": "Surrounded by nature reserves and top-tier institutions (Hwa Chong, Nanyang Girls, Raffles Girls), favored by generational families.",
        "avg_psf": 3150,
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3329,
        "lng": 103.7845
    },
    {
        "name": "Holland Village",
        "district": "D10",
        "zone": "Core Central Region (CCR)",
        "tagline": "Bohemian Sophistication & Contemporary Urban Retreats",
        "description": "Artisan cafes, vibrant pedestrian plazas, and architecturally striking low-rise luxury enclaves.",
        "avg_psf": 2980,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3115,
        "lng": 103.7963
    },
    {
        "name": "Novena & Newton",
        "district": "D11",
        "zone": "Core Central Region (CCR)",
        "tagline": "Medical City & Central Family Sanctuary",
        "description": "Prime residential belt renowned for HealthCity Novena, seamless highway connectivity, and elite institutions.",
        "avg_psf": 2750,
        "image": "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3204,
        "lng": 103.8436
    },
    {
        "name": "East Coast & Marine Parade",
        "district": "D15",
        "zone": "Rest of Central Region (RCR)",
        "tagline": "Laid-Back Coastal Luxury & Serene Beachfront Living",
        "description": "Uninterrupted sea views, breezy coastal living along East Coast Park, and proximity to Changi Jewel and the CBD.",
        "avg_psf": 2450,
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3010,
        "lng": 103.9056
    },
    {
        "name": "Katong & Joo Chiat",
        "district": "D15",
        "zone": "Rest of Central Region (RCR)",
        "tagline": "Peranakan Heritage, Artisan Boutiques & Vibrant Dining",
        "description": "Celebrated for conserved pastel shophouses, award-winning culinary gems, and charming luxury boutique developments.",
        "avg_psf": 2350,
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3072,
        "lng": 103.9002
    },
    {
        "name": "Jurong East",
        "district": "D22",
        "zone": "Outside Central Region (OCR)",
        "tagline": "Singapore's Second Central Business District & Innovation Hub",
        "description": "The epicenter of Singapore's Western transformation, featuring high-speed rail connectivity, commercial towers, and lush lake gardens.",
        "avg_psf": 1950,
        "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3329,
        "lng": 103.7436
    },
    {
        "name": "Tampines",
        "district": "D18",
        "zone": "Outside Central Region (OCR)",
        "tagline": "Eastern Regional Financial & Commercial Powerhouse",
        "description": "A self-sustaining metropolis with extensive banking back-offices, international aviation corridors, and modern executive condominiums.",
        "avg_psf": 1780,
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3532,
        "lng": 103.9447
    },
    {
        "name": "Punggol",
        "district": "D19",
        "zone": "Outside Central Region (OCR)",
        "tagline": "Singapore's First Digital District & Eco-Waterfront Town",
        "description": "Waterway leisure, tech innovation hubs (JTC Digital District, SIT Campus), and eco-smart waterfront residences.",
        "avg_psf": 1820,
        "image": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.4054,
        "lng": 103.9022
    },
    {
        "name": "Queenstown & Dawson",
        "district": "D03",
        "zone": "Rest of Central Region (RCR)",
        "tagline": "Pioneering Heritage Meets Sky-High Architectural Masterpieces",
        "description": "City-fringe haven featuring sky bridges, biophilic towers, and 5-minute transit directly to Tanjong Pagar and One-North.",
        "avg_psf": 2380,
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2942,
        "lng": 103.8060
    },
    {
        "name": "Bugis & Rochor",
        "district": "D07",
        "zone": "Core Central Region (CCR)",
        "tagline": "Arts, Culture & High-End Integrated Developments",
        "description": "Arts and heritage precinct home to DUO Residences and Guoco Midtown, blending cultural vibrancy with prime commercial dynamism.",
        "avg_psf": 2900,
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3005,
        "lng": 103.8558
    },
    {
        "name": "Beach Road & Ophir",
        "district": "D07",
        "zone": "Core Central Region (CCR)",
        "tagline": "The Transformative Waterfront Gateway to Downtown",
        "description": "Spectacular sea views, modern architectural marvels, and prime office towers catering to multinational headquarters.",
        "avg_psf": 2950,
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3020,
        "lng": 103.8610
    },
    {
        "name": "Bishan & Thomson",
        "district": "D20",
        "zone": "Rest of Central Region (RCR)",
        "tagline": "Central Nature Sanctuary & Established Residential Wealth",
        "description": "Flanked by MacRitchie Reservoir and Bishan-Ang Mo Kio Park, offering tranquility, elite schools, and landed estates.",
        "avg_psf": 2200,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.3508,
        "lng": 103.8488
    },
    {
        "name": "Keppel Bay",
        "district": "D04",
        "zone": "Core Central Region (CCR)",
        "tagline": "Iconic Waterfront Masterpieces by Daniel Libeskind",
        "description": "World-class marina promenade directly opposite Sentosa, home to luxury yachts, private berths, and curved glass towers.",
        "avg_psf": 2550,
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.2650,
        "lng": 103.8160
    },
    {
        "name": "Woodlands Regional Centre",
        "district": "D25",
        "zone": "Outside Central Region (OCR)",
        "tagline": "Northern Agri-Tech & Cross-Border Economic Gateway",
        "description": "Strategic cross-border economic gateway linking Singapore and Malaysia with upcoming RTS link and modern commercial clusters.",
        "avg_psf": 1650,
        "image": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
        "lat": 1.4360,
        "lng": 103.7865
    }
]

# 30 Top Singapore Real Estate Advisors / CEA Agents
FIRST_NAMES = [
    "Alistair", "Victoria", "Julian", "Clarissa", "Marcus", "Evelyn", "Dominic", "Seraphina",
    "Garrick", "Eleanor", "Jonathan", "Beatrice", "Raymond", "Charmaine", "Alexander", "Genevieve",
    "Benedict", "Jacqueline", "Harrison", "Fiona", "Christopher", "Valerie", "Desmond", "Audrey",
    "Christian", "Melanie", "Nathaniel", "Priscilla", "Lawrence", "Stephanie"
]

LAST_NAMES = [
    "Tan", "Lim", "Wee", "Teo", "Kwek", "Koh", "Ng", "Chua", "Lau", "Ong",
    "Goh", "Lee", "Yeo", "Chia", "Wong", "Sim", "Low", "Chew", "Tay", "Pang",
    "Ho", "Chen", "Seah", "Chan", "Quek", "Lien", "Loo", "Eu", "Chong", "Song"
]

SPECIALTIES = [
    "Good Class Bungalows & Prime Landed",
    "Sentosa Cove Waterfront & Superyachts",
    "Ultra-Prime Penthouses & Sky Mansions",
    "Heritage Shophouses & Conservation Assets",
    "Commercial Grade A & Capital Markets",
    "Prime District 9 & 10 Luxury Condominiums",
    "Family Office & Cross-Border Wealth Advisory",
    "New Luxury Launch Advisory"
]

LANGUAGES_LIST = [
    ["English", "Mandarin"],
    ["English", "Mandarin", "Cantonese"],
    ["English", "Mandarin", "Hokkien"],
    ["English", "French"],
    ["English", "Mandarin", "Bahasa Melayu"],
    ["English", "German", "Mandarin"]
]

AGENT_PHOTOS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80"
]

AGENTS = []
for i in range(30):
    aid = f"AG{i+1:03d}"
    first = FIRST_NAMES[i]
    last = LAST_NAMES[i]
    name = f"{first} {last}"
    exp = random.randint(8, 26)
    rating = round(random.uniform(4.82, 5.0), 2)
    vol = random.randint(80, 480) # millions SGD
    phone = f"+65 8{random.randint(100, 999)} {random.randint(1000, 9999)}"
    cea = f"R{random.randint(100000, 999999)}{chr(random.randint(65, 90))}"
    spec = SPECIALTIES[i % len(SPECIALTIES)]
    langs = LANGUAGES_LIST[i % len(LANGUAGES_LIST)]
    photo = AGENT_PHOTOS[i % len(AGENT_PHOTOS)]
    
    AGENTS.append({
        "id": aid,
        "name": name,
        "role": "Senior Private Wealth Partner" if exp > 18 else "Senior Luxury Advisor",
        "cea_number": cea,
        "experience_years": exp,
        "rating": rating,
        "review_count": random.randint(34, 98),
        "sales_volume_sgd_m": vol,
        "specialization": spec,
        "languages": langs,
        "phone": phone,
        "email": f"{first.lower()}.{last.lower()}@aurea-estates.com",
        "photo": photo,
        "bio": f"{name} is an esteemed luxury real estate advisor with over {exp} years of distinguished experience representing ultra-high-net-worth clients, family offices, and institutional investors in Singapore's most coveted residential and commercial enclaves."
    })

# 100 Realistic Singapore Properties
PROPERTY_TITLES = [
    # Marina Bay / D01
    ("The Sky Penthouse at Marina Bay Residences", "Marina Bay", "D01", "Downtown MRT", "Penthouse", 4, 5, 5200, 24800000, "Sale", "Freehold"),
    ("Marina One Marina View Suite", "Marina Bay", "D01", "Marina Bay MRT", "Condominium", 3, 3, 1780, 4980000, "Sale", "99-year Leasehold"),
    ("Sail @ Marina Bay Sky Villa", "Marina Bay", "D01", "Raffles Place MRT", "Penthouse", 4, 4, 3850, 16200000, "Sale", "99-year Leasehold"),
    ("One Shenton Dual Key Waterfront Residence", "Marina Bay", "D01", "Telok Ayer MRT", "Condominium", 2, 2, 1150, 2950000, "Sale", "99-year Leasehold"),
    ("Marina View Horizon Luxury Suite", "Marina Bay", "D01", "Shenton Way MRT", "Condominium", 1, 1, 680, 1850000, "Sale", "99-year Leasehold"),
    ("Marina One Presidential Suite for Lease", "Marina Bay", "D01", "Marina Bay MRT", "Condominium", 4, 4, 2800, 28000, "Rent", "99-year Leasehold"),
    
    # Tanjong Pagar / D02
    ("Wallich Residence Super Penthouse", "Tanjong Pagar", "D02", "Tanjong Pagar MRT", "Penthouse", 5, 6, 8500, 68000000, "Sale", "99-year Leasehold"),
    ("Altez Sky Duplex with Sea Panorama", "Tanjong Pagar", "D02", "Tanjong Pagar MRT", "Condominium", 3, 3, 2150, 4850000, "Sale", "99-year Leasehold"),
    ("Amoy Street Conserved Heritage Shophouse", "Tanjong Pagar", "D02", "Telok Ayer MRT", "Conservation Shophouse", 4, 4, 3600, 21500000, "Sale", "999-year Leasehold"),
    ("Club Street Michelin Dining Shophouse", "Tanjong Pagar", "D02", "Chinatown MRT", "Conservation Shophouse", 0, 4, 4200, 28500000, "Sale", "999-year Leasehold"),
    ("Skysuites @ Anson High-Floor Executive", "Tanjong Pagar", "D02", "Tanjong Pagar MRT", "Condominium", 2, 2, 1020, 2450000, "Sale", "99-year Leasehold"),
    ("Frasers Tower Grade A Premium Office Floor", "Tanjong Pagar", "D02", "Tanjong Pagar MRT", "Grade A Commercial Office", 0, 6, 12800, 85000, "Rent", "99-year Leasehold"),

    # Sentosa Cove / D04
    ("The Oceanfront Waterway Mega Villa", "Sentosa Cove", "D04", "HarbourFront MRT", "Waterfront Villa", 6, 7, 9200, 39500000, "Sale", "99-year Leasehold"),
    ("Seven Palms Sentosa Exclusive Beachfront", "Sentosa Cove", "D04", "HarbourFront MRT", "Condominium", 4, 5, 4100, 21800000, "Sale", "99-year Leasehold"),
    ("Cape Royale Panoramic Sea Sanctuary", "Sentosa Cove", "D04", "HarbourFront MRT", "Condominium", 3, 3, 2200, 5600000, "Sale", "99-year Leasehold"),
    ("Cove Drive Private Superyacht Villa", "Sentosa Cove", "D04", "HarbourFront MRT", "Waterfront Villa", 5, 6, 8400, 36000000, "Sale", "99-year Leasehold"),
    ("The Azure Marina Bay Penthouse", "Sentosa Cove", "D04", "HarbourFront MRT", "Penthouse", 4, 4, 3400, 11500000, "Sale", "99-year Leasehold"),
    ("Sandy Island Architectural Mansion", "Sentosa Cove", "D04", "HarbourFront MRT", "Waterfront Villa", 5, 5, 7800, 31000000, "Sale", "99-year Leasehold"),

    # Orchard & Paterson / D09
    ("The Marq on Paterson Hill Signature Lap Pool Villa", "Orchard", "D09", "Orchard Boulevard MRT", "Penthouse", 5, 6, 6200, 42000000, "Sale", "Freehold"),
    ("Boulevard 88 Sky Penthouse by Safdie", "Orchard", "D09", "Orchard MRT", "Penthouse", 4, 5, 5600, 33500000, "Sale", "Freehold"),
    ("Cuscaden Reserve Minimalist Residence", "Orchard", "D09", "Orchard Boulevard MRT", "Condominium", 2, 2, 980, 3400000, "Sale", "99-year Leasehold"),
    ("Park Nova Biophilic Sky Residence", "Orchard", "D09", "Orchard Boulevard MRT", "Condominium", 3, 4, 2200, 10200000, "Sale", "Freehold"),
    ("Reignwood Hamilton Scotts with Sky Garage", "Orchard", "D09", "Newton MRT", "Condominium", 3, 3, 2750, 11800000, "Sale", "Freehold"),
    ("TwentyOne Angullia Park Modernist Suite", "Orchard", "D09", "Orchard MRT", "Condominium", 3, 3, 2250, 8900000, "Sale", "Freehold"),
    ("Scotts Square Panoramic Sky Residence", "Orchard", "D09", "Orchard MRT", "Condominium", 2, 2, 1220, 4600000, "Sale", "Freehold"),

    # Tanglin & Nassim / D10
    ("Les Maisons Nassim Royal Duplex Penthouse", "Tanglin & Nassim", "D10", "Napier MRT", "Penthouse", 5, 6, 8800, 75000000, "Sale", "Freehold"),
    ("Nassim Road GCB Contemporary Sanctuary", "Tanglin & Nassim", "D10", "Napier MRT", "Good Class Bungalow", 6, 8, 14500, 98000000, "Sale", "Freehold"),
    ("Cluny Hill Good Class Bungalow Estate", "Tanglin & Nassim", "D10", "Botanic Gardens MRT", "Good Class Bungalow", 7, 9, 16800, 112000000, "Sale", "Freehold"),
    ("19 Nassim Luxury One-Bedroom Suite", "Tanglin & Nassim", "D10", "Napier MRT", "Condominium", 1, 1, 620, 2450000, "Sale", "99-year Leasehold"),
    ("Nassim Park Residences Garden Maisonette", "Tanglin & Nassim", "D10", "Napier MRT", "Condominium", 4, 5, 4600, 26500000, "Sale", "Freehold"),
    ("Dalvey Estate Good Class Bungalow", "Tanglin & Nassim", "D10", "Stevens MRT", "Good Class Bungalow", 6, 7, 13200, 89000000, "Sale", "Freehold"),

    # Bukit Timah & Ardmore / D10
    ("Sculptura Ardmore Masterpiece Residence", "Bukit Timah", "D10", "Newton MRT", "Penthouse", 4, 5, 4800, 32000000, "Sale", "Freehold"),
    ("Le Nouvel Ardmore White Glove Penthouse", "Bukit Timah", "D10", "Orchard MRT", "Penthouse", 5, 6, 5300, 36800000, "Sale", "Freehold"),
    ("Ardmore Park Iconic High-Floor Classic", "Bukit Timah", "D10", "Newton MRT", "Condominium", 4, 4, 2885, 12800000, "Sale", "Freehold"),
    ("Sixth Avenue Modern GCB with Lap Pool", "Bukit Timah", "D10", "Sixth Avenue MRT", "Good Class Bungalow", 5, 6, 11500, 58000000, "Sale", "Freehold"),
    ("d'Leedon Garden Villa by Zaha Hadid", "Bukit Timah", "D10", "Farrer Road MRT", "Condominium", 4, 4, 3700, 7800000, "Sale", "99-year Leasehold"),
    ("Royalgreen Tranquil Botanical Residence", "Bukit Timah", "D10", "Sixth Avenue MRT", "Condominium", 3, 3, 1150, 3180000, "Sale", "Freehold"),

    # River Valley / D09
    ("Martin Modern Forest Pavilion Residence", "River Valley", "D09", "Great World MRT", "Condominium", 3, 3, 1420, 4350000, "Sale", "99-year Leasehold"),
    ("Rivière Promenade Riverfront Penthouse", "River Valley", "D09", "Great World MRT", "Penthouse", 4, 4, 3200, 11800000, "Sale", "99-year Leasehold"),
    ("Irwell Hill Residences High Floor Sky View", "River Valley", "D09", "Great World MRT", "Condominium", 2, 2, 850, 2680000, "Sale", "99-year Leasehold"),
    ("The Trillium Prime High-Rise Home", "River Valley", "D09", "Great World MRT", "Condominium", 4, 4, 2400, 6800000, "Sale", "Freehold"),

    # Holland Village / D10
    ("One Holland Village Modern Sky Residence", "Holland Village", "D10", "Holland Village MRT", "Condominium", 3, 3, 1380, 4200000, "Sale", "99-year Leasehold"),
    ("Leedon Green Botanical Haven", "Holland Village", "D10", "Farrer Road MRT", "Condominium", 2, 2, 880, 2750000, "Sale", "Freehold"),
    ("Parc Sophia Boutique Residence", "Holland Village", "D10", "Holland Village MRT", "Condominium", 2, 1, 750, 1950000, "Sale", "Freehold"),

    # Novena & Newton / D11
    ("Pullman Residences Newton Sky Suite", "Novena & Newton", "D11", "Newton MRT", "Condominium", 3, 3, 1280, 3950000, "Sale", "Freehold"),
    ("10 Evelyn Tranquil Boutique Living", "Novena & Newton", "D11", "Newton MRT", "Condominium", 2, 2, 820, 2280000, "Sale", "Freehold"),
    ("Soleil @ Sinaran High Floor Executive", "Novena & Newton", "D11", "Novena MRT", "Condominium", 3, 3, 1450, 3450000, "Sale", "99-year Leasehold"),
    ("Peak Residence Panoramic Hillside Home", "Novena & Newton", "D11", "Novena MRT", "Condominium", 3, 2, 1080, 2880000, "Sale", "Freehold"),

    # East Coast & Marine Parade / D15
    ("Meyer Mansion Sea-Facing Duplex", "East Coast & Marine Parade", "D15", "Tanjong Katong MRT", "Condominium", 4, 4, 2180, 6980000, "Sale", "Freehold"),
    ("Amber Park Sky Lounge Corner Residence", "East Coast & Marine Parade", "D15", "Tanjong Katong MRT", "Condominium", 3, 3, 1570, 4450000, "Sale", "Freehold"),
    ("Meyerise Coastal Panoramic Home", "East Coast & Marine Parade", "D15", "Katong Park MRT", "Condominium", 4, 4, 2050, 5800000, "Sale", "Freehold"),
    ("Seaside Residences Direct Beach Corridor", "East Coast & Marine Parade", "D15", "Siglap MRT", "Condominium", 2, 2, 850, 2180000, "Sale", "99-year Leasehold"),

    # Katong & Joo Chiat / D15
    ("Koon Seng Road Conserved Peranakan Shophouse", "Katong & Joo Chiat", "D15", "Eunos MRT", "Conservation Shophouse", 4, 4, 3200, 13800000, "Sale", "Freehold"),
    ("East Coast Road F&B Approved Shophouse", "Katong & Joo Chiat", "D15", "Marine Parade MRT", "Conservation Shophouse", 0, 3, 2800, 15500000, "Sale", "Freehold"),
    ("Tembusu Grand Premier Family Residence", "Katong & Joo Chiat", "D15", "Tanjong Katong MRT", "Condominium", 4, 3, 1720, 3850000, "Sale", "99-year Leasehold"),
    ("The Continuum Luxury Dual Balcony Suite", "Katong & Joo Chiat", "D15", "Dakota MRT", "Condominium", 3, 2, 1250, 2980000, "Sale", "Freehold"),

    # Jurong East / D22
    ("J'Den Integrated Commercial-Residential Tower", "Jurong East", "D22", "Jurong East MRT", "Condominium", 3, 2, 1180, 2750000, "Sale", "99-year Leasehold"),
    ("Lake Grande Waterfront Residence", "Jurong East", "D22", "Lakeside MRT", "Condominium", 3, 2, 980, 1880000, "Sale", "99-year Leasehold"),
    ("Westgate Tower Prime Grade A Office Floor", "Jurong East", "D22", "Jurong East MRT", "Grade A Commercial Office", 0, 4, 8500, 52000, "Rent", "99-year Leasehold"),
    ("J Gateway Sky Villa with Panoramic Views", "Jurong East", "D22", "Jurong East MRT", "Penthouse", 4, 3, 2020, 3850000, "Sale", "99-year Leasehold"),

    # Tampines / D18
    ("Tenet Executive Luxury Living", "Tampines", "D18", "Tampines North MRT", "Condominium", 4, 3, 1400, 2150000, "Sale", "99-year Leasehold"),
    ("The Tapestry Tranquil Resort Home", "Tampines", "D18", "Tampines West MRT", "Condominium", 3, 2, 1050, 1720000, "Sale", "99-year Leasehold"),
    ("Tampines Concourse Commercial Hub Unit", "Tampines", "D18", "Tampines MRT", "Grade A Commercial Office", 0, 2, 3400, 19500, "Rent", "99-year Leasehold"),
    ("Parc Central Residences Family Haven", "Tampines", "D18", "Tampines MRT", "Condominium", 3, 2, 1120, 1820000, "Sale", "99-year Leasehold"),

    # Punggol / D19
    ("Piermont Grand Waterfront Executive Suite", "Punggol", "D19", "Punggol MRT", "Condominium", 4, 3, 1360, 2080000, "Sale", "99-year Leasehold"),
    ("Waterwoods Scenic Riverfront Penthouse", "Punggol", "D19", "Coral Edge LRT", "Penthouse", 4, 3, 1850, 2480000, "Sale", "99-year Leasehold"),
    ("Watertown Integrated Waterway Mall Residence", "Punggol", "D19", "Punggol MRT", "Condominium", 2, 2, 850, 1450000, "Sale", "99-year Leasehold"),
    ("Punggol Digital District Tech Office Space", "Punggol", "D19", "Punggol Coast MRT", "Grade A Commercial Office", 0, 4, 5200, 32000, "Rent", "99-year Leasehold"),

    # Queenstown & Dawson / D03
    ("SkyVille @ Dawson High-Floor Architectural Gem", "Queenstown & Dawson", "D03", "Queenstown MRT", "Condominium", 3, 2, 1100, 1680000, "Sale", "99-year Leasehold"),
    ("Stirling Residences Crown Jewel Penthouse", "Queenstown & Dawson", "D03", "Queenstown MRT", "Penthouse", 4, 4, 2600, 6800000, "Sale", "99-year Leasehold"),
    ("Queens Peak Direct Link Sky Residence", "Queenstown & Dawson", "D03", "Queenstown MRT", "Condominium", 2, 2, 830, 1920000, "Sale", "99-year Leasehold"),
    ("Margaret Ville Panoramic City Fringe Home", "Queenstown & Dawson", "D03", "Commonwealth MRT", "Condominium", 3, 2, 920, 2180000, "Sale", "99-year Leasehold"),

    # Bugis & Beach Road / D07
    ("Guoco Midtown Modern Sky Villa", "Bugis & Rochor", "D07", "Bugis MRT", "Penthouse", 4, 4, 3500, 14200000, "Sale", "99-year Leasehold"),
    ("DUO Residences High-Floor Landmark", "Bugis & Rochor", "D07", "Bugis MRT", "Condominium", 3, 3, 1650, 4580000, "Sale", "99-year Leasehold"),
    ("South Beach Residences Sea-View Suite", "Beach Road & Ophir", "D07", "Esplanade MRT", "Condominium", 3, 3, 2100, 8900000, "Sale", "99-year Leasehold"),
    ("The M @ Middle Road Modern Urban Pad", "Bugis & Rochor", "D07", "Bugis MRT", "Condominium", 2, 2, 780, 2250000, "Sale", "99-year Leasehold"),
    ("Tan Quee Lan Street Restored Heritage Shophouse", "Bugis & Rochor", "D07", "Bugis MRT", "Conservation Shophouse", 0, 4, 3800, 24500000, "Sale", "999-year Leasehold"),

    # Bishan & Thomson / D20
    ("Jadescape Smart Biophilic Grand Suite", "Bishan & Thomson", "D20", "Marymount MRT", "Condominium", 4, 4, 1980, 3950000, "Sale", "99-year Leasehold"),
    ("Thomson Three Hillside Peaceful Residence", "Bishan & Thomson", "D20", "Upper Thomson MRT", "Condominium", 3, 2, 1140, 2350000, "Sale", "99-year Leasehold"),
    ("Bishan Park Sanctuary Landed Villa", "Bishan & Thomson", "D20", "Bishan MRT", "Good Class Bungalow", 5, 5, 8200, 28500000, "Sale", "Freehold"),

    # Keppel Bay / D04
    ("Reflections at Keppel Bay Iconic Villa", "Keppel Bay", "D04", "Telok Blangah MRT", "Condominium", 4, 4, 3150, 8800000, "Sale", "99-year Leasehold"),
    ("Corals at Keppel Bay Low-Rise Marine Suite", "Keppel Bay", "D04", "HarbourFront MRT", "Condominium", 3, 3, 1680, 4980000, "Sale", "99-year Leasehold"),
    ("Caribbean at Keppel Bay Private Berthing Haven", "Keppel Bay", "D04", "HarbourFront MRT", "Condominium", 3, 3, 1550, 3600000, "Sale", "99-year Leasehold"),

    # Woodlands & North / D25
    ("Woodlands Square Premium Tech Grade A Office", "Woodlands Regional Centre", "D25", "Woodlands MRT", "Grade A Commercial Office", 0, 3, 4200, 23000, "Rent", "99-year Leasehold"),
    ("Parc Rosewood Serene Low-Rise Penthouse", "Woodlands Regional Centre", "D25", "Woodlands MRT", "Penthouse", 3, 3, 1650, 1950000, "Sale", "99-year Leasehold"),

    # Additional Prime & Exclusive Properties to hit 100
    ("Marina Bay Sands Adjacent Duplex Penthouse", "Marina Bay", "D01", "Bayfront MRT", "Penthouse", 4, 5, 4600, 23500000, "Sale", "99-year Leasehold"),
    ("One Raffles Quay Trophy Office Space", "Marina Bay", "D01", "Raffles Place MRT", "Grade A Commercial Office", 0, 8, 14500, 115000, "Rent", "99-year Leasehold"),
    ("Tras Street Michelin Star Dining Shophouse", "Tanjong Pagar", "D02", "Tanjong Pagar MRT", "Conservation Shophouse", 0, 4, 3900, 26000000, "Sale", "999-year Leasehold"),
    ("Sentosa Cove Coral Island Water Residence", "Sentosa Cove", "D04", "HarbourFront MRT", "Waterfront Villa", 5, 6, 7900, 34500000, "Sale", "99-year Leasehold"),
    ("The Nassim Ultra-Exclusive Garden Suite", "Tanglin & Nassim", "D10", "Napier MRT", "Condominium", 4, 4, 3800, 23000000, "Sale", "Freehold"),
    ("Gallop Green Sprawling Freehold Condominium", "Tanglin & Nassim", "D10", "Farrer Road MRT", "Condominium", 4, 4, 3200, 10500000, "Sale", "Freehold"),
    ("White House Park Historic GCB Estate", "Tanglin & Nassim", "D10", "Stevens MRT", "Good Class Bungalow", 7, 8, 15800, 108000000, "Sale", "Freehold"),
    ("Cluny Park Residence Boutique Sanctuary", "Tanglin & Nassim", "D10", "Botanic Gardens MRT", "Condominium", 3, 3, 1750, 5950000, "Sale", "Freehold"),
    ("Goodwood Grand Lush Hilltop Home", "Novena & Newton", "D11", "Newton MRT", "Condominium", 3, 3, 1350, 3750000, "Sale", "Freehold"),
    ("Hilltops Orchard Bespoke Luxury Residence", "Orchard", "D09", "Orchard MRT", "Condominium", 4, 4, 2900, 13500000, "Sale", "Freehold"),
    ("Petit Jervois Crafted Botanical Haven", "River Valley", "D10", "Redhill MRT", "Condominium", 2, 2, 950, 3200000, "Sale", "Freehold"),
    ("Bishopsgate Residences Ultra-Quiet GCB Enclave", "Tanglin & Nassim", "D10", "Great World MRT", "Condominium", 4, 4, 3100, 14800000, "Sale", "Freehold"),
    ("Telok Ayer Commercial Historic Flagship", "Tanjong Pagar", "D02", "Telok Ayer MRT", "Conservation Shophouse", 0, 6, 5400, 38000000, "Sale", "999-year Leasehold"),
    ("Cairnhill Nine Sky Bridge Connected Suite", "Orchard", "D09", "Orchard MRT", "Condominium", 2, 2, 1050, 3100000, "Sale", "99-year Leasehold"),
    ("Boulevard Vue Private Floor Residence", "Orchard", "D09", "Orchard Boulevard MRT", "Condominium", 4, 5, 4500, 22500000, "Sale", "Freehold"),
    ("Nassim Jade Classic Heritage Residence", "Tanglin & Nassim", "D10", "Napier MRT", "Condominium", 4, 4, 3400, 15800000, "Sale", "Freehold"),
    ("One Tree Hill Rare Prime Modern Bungalow", "Orchard", "D09", "Orchard Boulevard MRT", "Good Class Bungalow", 5, 6, 8900, 48000000, "Sale", "Freehold"),
    ("Sentosa Cove Turquoise Deep Sea Berth Penthouse", "Sentosa Cove", "D04", "HarbourFront MRT", "Penthouse", 4, 5, 4200, 14200000, "Sale", "99-year Leasehold"),
    ("Kallang Riverside Freehold Waterfront Living", "Bugis & Rochor", "D12", "Lavender MRT", "Condominium", 2, 2, 820, 2150000, "Sale", "Freehold"),
    ("Guoco Midtown Bay High-Floor Designer Suite", "Bugis & Rochor", "D07", "Bugis MRT", "Condominium", 1, 1, 520, 1720000, "Sale", "99-year Leasehold")
]

AMENITIES_POOL = [
    "Private Lift Access", "Infinity Sky Pool", "24-Hour Concierge", "Smart Home Automation",
    "Private Yacht Berth", "Temperature-Controlled Wine Cellar", "Private Chef Kitchen", "Sub-Zero & Miele Appliances",
    "Panoramic Marina Bay Views", "Private Jacuzzi", "Dedicated EV Fast Charging", "Valet Parking",
    "Hydrotherapy Wellness Spa", "Private Gymnasium", "Clubhouse & Banquet Hall", "Tennis Court",
    "Lush Sky Terrace Gardens", "Botanic Gardens Facing", "BBQ Dining Pavilion", "Children's Splash Pool"
]

PROPERTIES = []
for idx, item in enumerate(PROPERTY_TITLES):
    pid = f"PR{idx+1:03d}"
    title, loc, dist, mrt, ptype, beds, baths, sqft, price, ltype, tenure = item
    dev = DEVELOPERS[idx % len(DEVELOPERS)]
    agent = AGENTS[idx % len(AGENTS)]
    
    # Pick photos based on type
    if ptype == "Penthouse":
        photo_pool = PHOTOS["penthouse"]
    elif ptype == "Good Class Bungalow":
        photo_pool = PHOTOS["gcb"]
    elif ptype == "Waterfront Villa":
        photo_pool = PHOTOS["waterfront"]
    elif ptype == "Conservation Shophouse":
        photo_pool = PHOTOS["shophouse"]
    elif ptype == "Grade A Commercial Office":
        photo_pool = PHOTOS["commercial"]
    else:
        photo_pool = PHOTOS["condo"]
        
    # Pick 5 images
    imgs = [photo_pool[j % len(photo_pool)] for j in range(idx, idx + 5)]
    
    # Pick 6 amenities
    amens = random.sample(AMENITIES_POOL, 6)
    
    psf = round(price / sqft) if sqft > 0 else 0
    featured = idx in [0, 1, 6, 8, 12, 18, 24, 25, 30, 48, 64, 76]
    
    desc = (
        f"An immaculate {ptype.lower()} set within Singapore's prestigious {loc} ({dist}). "
        f"Designed to the highest architectural standards by {dev['name']}, this signature residence "
        f"features {beds} stately bedrooms, {baths} designer bathrooms across {sqft:,} sq ft of refined living space. "
        f"Just moments from {mrt}, offering exceptional privacy, breathtaking panoramas, and effortless luxury."
    )
    
    PROPERTIES.append({
        "id": pid,
        "title": title,
        "description": desc,
        "price_sgd": price,
        "listing_type": ltype,
        "property_type": ptype,
        "bedrooms": beds,
        "bathrooms": baths,
        "area_sqft": sqft,
        "psf": psf,
        "location": loc,
        "district": dist,
        "nearest_mrt": mrt,
        "developer": dev["name"],
        "developer_id": dev["id"],
        "agent_id": agent["id"],
        "amenities": amens,
        "images": imgs,
        "featured": featured,
        "tenure": tenure,
        "year_built": random.randint(2018, 2025),
        "furnishing": random.choice(["Designer Furnished", "Partially Furnished", "Unfurnished (Bespoke Ready)"]),
        "floor_level": random.choice(["Penthouse Level", "High Floor (Level 40+)", "High Floor (Level 25-39)", "Mid Floor", "Sprawling Ground Estate"])
    })

# 200 Realistic Luxury Buyer & Investor Reviews
REVIEW_NAMES = [
    "Dato' Sri Kenneth Chan", "Lady Vivienne Kensington", "Marcus & Rachel Vance", "Dr. Heinrich von Weber",
    "Goh Cheng Liang Family Trust", "Sir Arthur Sterling", "Alistair Montgomery", "Chloe & Julien Delacroix",
    "Benoit Laurent", "Kavita & Rajesh Singhal", "Dr. Jonathan Tan", "Elena Rostova", "Lord Sebastian Thorne",
    "Victor & Mei Lin Zhang", "Hans-Peter Meyer", "Cheung Kong Holdings Executive", "Sophia & Liam Gallagher",
    "Taro & Keiko Takahashi", "Geraldine & Mark Fontaine", "Ananya & Rohan Birla"
]

FEEDBACK_TEMPLATES = [
    "Acquiring our penthouse through AUREA was an impeccably smooth transaction. The confidentiality and analytical rigor were exceptional.",
    "Their team arranged private after-hours viewings and negotiated terms with maximum discretion. Truly the premier luxury brokerage in Singapore.",
    "The market insights provided gave our family office complete clarity on district appreciation and stamp duty structures.",
    "A masterclass in private wealth real estate advisory. Found us an off-market Good Class Bungalow in Nassim that exceeded every expectation.",
    "From legal escrow coordination to designer interior recommendations, AUREA handled everything seamlessly. Unrivaled professionalism.",
    "Remarkable attention to detail. The virtual walkthroughs and 3D architectural models were crucial for our overseas acquisition.",
    "Best experience buying commercial shophouses in Tanjong Pagar. Their yield projections were accurate down to the decimal point."
]

REVIEWS = []
for i in range(200):
    prop = PROPERTIES[i % len(PROPERTIES)]
    agent = AGENTS[i % len(AGENTS)]
    client = REVIEW_NAMES[i % len(REVIEW_NAMES)]
    if i >= len(REVIEW_NAMES):
        client = f"{client} (Client #{i+1})"
        
    REVIEWS.append({
        "id": f"REV{i+1:03d}",
        "author": client,
        "rating": 5 if i % 6 != 0 else 4,
        "date": f"202{random.randint(4, 6)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}",
        "property_id": prop["id"],
        "property_title": prop["title"],
        "agent_id": agent["id"],
        "agent_name": agent["name"],
        "verified": True,
        "comment": FEEDBACK_TEMPLATES[i % len(FEEDBACK_TEMPLATES)]
    })

# Market Insights Dataset
MARKET_INSIGHTS = {
    "summary": {
        "avg_property_price_sgd": 18450000,
        "total_listings": len(PROPERTIES),
        "total_agents": len(AGENTS),
        "total_developers": len(DEVELOPERS),
        "avg_psf_overall": 3140,
        "year_on_year_growth": 6.8,
        "rental_yield_avg": 3.7
    },
    "district_psf": [
        {"district": "D10 Tanglin/GCB", "psf": 4500, "growth": "+8.4%", "rental_yield": 2.9},
        {"district": "D09 Orchard", "psf": 3650, "growth": "+6.2%", "rental_yield": 3.4},
        {"district": "D01 Marina Bay", "psf": 3450, "growth": "+7.1%", "rental_yield": 3.9},
        {"district": "D10 Bukit Timah", "psf": 3150, "growth": "+5.8%", "rental_yield": 3.1},
        {"district": "D02 Tanjong Pagar", "psf": 3100, "growth": "+6.5%", "rental_yield": 4.1},
        {"district": "D07 Bugis/Beach Rd", "psf": 2950, "growth": "+7.8%", "rental_yield": 4.2},
        {"district": "D04 Sentosa Cove", "psf": 2680, "growth": "+4.9%", "rental_yield": 3.6},
        {"district": "D15 East Coast", "psf": 2450, "growth": "+5.3%", "rental_yield": 3.8},
        {"district": "D03 Queenstown", "psf": 2380, "growth": "+4.7%", "rental_yield": 4.0},
        {"district": "D22 Jurong East", "psf": 1950, "growth": "+6.9%", "rental_yield": 4.3},
        {"district": "D19 Punggol", "psf": 1820, "growth": "+5.1%", "rental_yield": 4.4},
        {"district": "D18 Tampines", "psf": 1780, "growth": "+4.5%", "rental_yield": 4.2}
    ],
    "quarterly_index": [
        {"quarter": "2024 Q1", "ccr_index": 164.2, "rcr_index": 172.5, "ocr_index": 180.1},
        {"quarter": "2024 Q2", "ccr_index": 166.8, "rcr_index": 174.1, "ocr_index": 182.4},
        {"quarter": "2024 Q3", "ccr_index": 169.5, "rcr_index": 176.8, "ocr_index": 184.9},
        {"quarter": "2024 Q4", "ccr_index": 172.1, "rcr_index": 179.3, "ocr_index": 187.2},
        {"quarter": "2025 Q1", "ccr_index": 174.8, "rcr_index": 182.0, "ocr_index": 189.6},
        {"quarter": "2025 Q2", "ccr_index": 177.6, "rcr_index": 184.7, "ocr_index": 192.3},
        {"quarter": "2025 Q3", "ccr_index": 180.9, "rcr_index": 187.4, "ocr_index": 195.1},
        {"quarter": "2025 Q4", "ccr_index": 184.5, "rcr_index": 190.8, "ocr_index": 198.5}
    ],
    "property_distribution": [
        {"name": "Condominiums", "value": 42, "color": "#0F172A"},
        {"name": "Penthouses", "value": 20, "color": "#D4AF37"},
        {"name": "Good Class Bungalows", "value": 14, "color": "#475569"},
        {"name": "Waterfront Villas", "value": 10, "color": "#2563EB"},
        {"name": "Commercial Shophouses", "value": 8, "color": "#B45309"},
        {"name": "Grade A Offices", "value": 6, "color": "#059669"}
    ]
}

# New Projects / Developments Showcase
NEW_PROJECTS = [
    {
        "id": "NP001",
        "name": "Midtown Modern & Guoco Midtown",
        "developer": "GuocoLand",
        "district": "D07 Bugis",
        "completion_year": 2025,
        "units": 558,
        "tenure": "99-year Leasehold",
        "starting_price": 2200000,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "description": "Revolutionary biophilic integrated mixed-use development seamlessly connected to Bugis MRT interchange, featuring 1 hectare of botanical gardens.",
        "architect": "ADDP Architects & IPP",
        "features": ["Direct MRT Underground Link", "Full Concierge", "50m Lap Pool", "Coworking Lounges"]
    },
    {
        "id": "NP002",
        "name": "Boulevard 88",
        "developer": "City Developments Limited (CDL)",
        "district": "D09 Orchard",
        "completion_year": 2024,
        "units": 154,
        "tenure": "Freehold",
        "starting_price": 4800000,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "architect": "Moshe Safdie",
        "description": "A sculptural masterpiece towering above Orchard Boulevard with an iconic Sky Bridge connecting the twin towers.",
        "features": ["Safdie Sky Bridge", "The Singapore EDITION Hotel Services", "Infinity Sky Pool", "Private Wine Cellars"]
    },
    {
        "id": "NP003",
        "name": "Les Maisons Nassim",
        "developer": "Shun Tak Holdings",
        "district": "D10 Nassim",
        "completion_year": 2024,
        "units": 14,
        "tenure": "Freehold",
        "starting_price": 38000000,
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        "architect": "WOHA Architects",
        "description": "Fourteen bespoke ultra-luxury residences spanning up to 12,000 sq ft, each with private swimming pool and dedicated car lifts.",
        "features": ["Super-Prime Nassim Address", "Private Pools per Residence", "Custom Italian Finishes", "24/7 Butler Service"]
    },
    {
        "id": "NP004",
        "name": "Marina One Residences",
        "developer": "CapitaLand & M+S",
        "district": "D01 Marina Bay",
        "completion_year": 2023,
        "units": 1042,
        "tenure": "99-year Leasehold",
        "starting_price": 1850000,
        "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
        "architect": "Ingenhoven Architects",
        "description": "An internationally celebrated green architectural marvel boasting the 65,000 sq ft 'Green Heart' biodiverse rain forest sanctuary in Marina Bay.",
        "features": ["Green Heart Biodiverse Oasis", "4 MRT Lines Integration", "Olympic 50m Pool", "Teppanyaki Pavilions"]
    },
    {
        "id": "NP005",
        "name": "Park Nova",
        "developer": "Shun Tak Holdings",
        "district": "D10 Orchard Boulevard",
        "completion_year": 2024,
        "units": 54,
        "tenure": "Freehold",
        "starting_price": 5900000,
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "architect": "PLP Architecture London",
        "description": "Biophilic butterfly-shaped architecture featuring lush vertical sky planters and 270-degree panoramic unblocked horizons.",
        "features": ["Biophilic Sky Terraces", "Private Lift Lobbies", "Ultra-Low Density", "Freehold District 10"]
    }
]

# Compile entire complete database
DATASET = {
    "project_type": "Commercial Real Estate Platform",
    "metadata": {
        "properties_count": len(PROPERTIES),
        "agents_count": len(AGENTS),
        "developers_count": len(DEVELOPERS),
        "reviews_count": len(REVIEWS),
        "locations_count": len(LOCATIONS),
        "images_per_property": 5
    },
    "properties": PROPERTIES,
    "agents": AGENTS,
    "developers": DEVELOPERS,
    "reviews": REVIEWS,
    "locations": LOCATIONS,
    "new_projects": NEW_PROJECTS,
    "market_insights": MARKET_INSIGHTS
}

os.makedirs("src/data", exist_ok=True)
with open("src/data/dataset.json", "w", encoding="utf-8") as f:
    json.dump(DATASET, f, indent=2, ensure_ascii=False)

print(f"Dataset generated successfully!")
print(f"Properties: {len(PROPERTIES)}")
print(f"Agents: {len(AGENTS)}")
print(f"Developers: {len(DEVELOPERS)}")
print(f"Reviews: {len(REVIEWS)}")
print(f"Locations: {len(LOCATIONS)}")
