import pytest
from rest_framework.test import APIClient
from notes.models import Note

@pytest.mark.django_db
def test_create_and_fetch_note():
    client = APIClient()
    payload = {"title": "Praktikum Prep", "content": "DevSecOps portfolio build."}

    # Test POST (Create)
    response = client.post('/api/notes/', payload, format='json')
    assert response.status_code == 201
    assert response.data["title"] == "Praktikum Prep"

    # Test GET (Retrieve)
    get_response = client.get('/api/notes/')
    assert get_response.status_code == 200
    assert len(get_response.data) == 1