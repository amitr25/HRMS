#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Navigate to the Django project directory
cd hrms_backend

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
