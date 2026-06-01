from enum import StrEnum

from fastapi import HTTPException, status


class Role(StrEnum):
    citizen = "citizen"
    moderator = "moderator"
    officer = "officer"
    admin = "admin"


ROLE_PERMISSIONS = {
    Role.citizen: {"complaint:create", "complaint:read", "assistant:query"},
    Role.moderator: {"complaint:read", "complaint:verify", "complaint:merge"},
    Role.officer: {"complaint:read", "complaint:update", "project:update"},
    Role.admin: {"*"},
}


def require_permission(role: Role, permission: str) -> None:
    permissions = ROLE_PERMISSIONS[role]
    if "*" not in permissions and permission not in permissions:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")

