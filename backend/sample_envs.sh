chmod +x release.sh envs.sh start.sh

export DB_HOST=127.0.0.1
export DB_PASSWORD=password
export DB_USER=postgres
export DB_NAME=postgres
export DB_SCHEMA=wordfun
export DB_PORT=5432

export WORDFUN_LOCAL_MODE=true

export GOOGLE_APPLICATION_CREDENTIALS="credentials.json"
export AUDIO_FILES_DIR="/files/audio/"
export VIDEO_FILES_DIR="/files/video"
export WORKSHEET_FILES_DIR="/files/worksheets/"
export WORDFUN_PORT=8081