COMPLAINTS = [
    {
        "id": 1001,
        "title": "Road surface collapsed near school gate",
        "description": "Pothole cluster is unsafe during school hours.",
        "location": "Ward 9, Lake Road",
        "category": "Road Damage",
        "department": "Public Works",
        "priority": "Critical",
        "status": "Assigned",
        "urgency_score": 91,
        "risk_level": "High",
    },
    {
        "id": 1002,
        "title": "Drainage overflow after evening rain",
        "description": "Blocked drain causing water backflow near clinic.",
        "location": "Ward 12, Canal Street",
        "category": "Drainage",
        "department": "Water & Drainage",
        "priority": "High",
        "status": "In Progress",
        "urgency_score": 84,
        "risk_level": "High",
    },
]

PROJECTS = [
    {
        "id": 1,
        "name": "East Canal Drainage Upgrade",
        "department": "Water & Drainage",
        "location": "Zone East",
        "contractor": "Apex Infra",
        "budget": 42.0,
        "progress": 42,
        "status": "Delayed",
        "risk_score": 86,
    },
    {
        "id": 2,
        "name": "Lake Road Resurfacing",
        "department": "Public Works",
        "location": "Ward 9",
        "contractor": "Metro Roads Ltd",
        "budget": 18.0,
        "progress": 61,
        "status": "At Risk",
        "risk_score": 74,
    },
]

DEPARTMENTS = [
    {"id": 1, "name": "Public Works", "owner": "Chief Engineer A. Menon", "open_complaints": 146, "resolution_rate": 61, "performance_score": 58},
    {"id": 2, "name": "Water & Drainage", "owner": "Director S. Rao", "open_complaints": 98, "resolution_rate": 66, "performance_score": 64},
    {"id": 3, "name": "Sanitation", "owner": "Commissioner P. Das", "open_complaints": 72, "resolution_rate": 74, "performance_score": 72},
]

