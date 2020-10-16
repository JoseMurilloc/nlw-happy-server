# Como faço para inciar a aplicação?

Observação é necessario ter instalando o <a href="https://nodejs.org/pt-br/download/">
  <strong>@nodejs</strong>
</a>

```bash
$ git clone https://github.com/JoseMurilloc/nlw-happy-server.git
$ cd nlw-happy-server
$ yarn
$ yarn dev
```

## Rotas da aplicação

```json
{
  "routes": {
    "/orphanages": ["list all orphanages", "get"],
    "/orphanages/:id":[ "Show one orphanage", "get"],
    "/orphanages": ["Create one orphanage", "post"]
  }
}
```
