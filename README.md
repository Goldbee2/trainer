
#### To start open-webui
```docker compose up -d```

#### To view a live log stream
```docker compose logs -f open-webui```

#### To build model
```ollama create trainerGemma3 -f /models/trainerGemma3```

#### To execute commands within the docker container
```docker exec -it ollama bash```