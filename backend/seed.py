from app.db.session import Base, engine
from app.models import AIInsight, Budget, Complaint, Department, Project, User


def run() -> None:
    Base.metadata.create_all(bind=engine)
    print("Database tables created. Demo API uses in-memory seed fixtures for instant hackathon startup.")


if __name__ == "__main__":
    run()

