# studious-journey-todo
speedrun fast scratch from the scratch

create volume, build image, run demo
```shell
    docker volume create my-app-data
    docker build -t my-app .
    docker run -it --rm \
      -v my-app-data:/app/data \
      -p 3000:3000 \
      my-app
```
