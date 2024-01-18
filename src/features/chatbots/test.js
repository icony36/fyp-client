{
  "services": [
      {
          "type": "app",
          "data": {
              "projectName": "",
              "serviceName": "rasa",
              "source": {
                  "type": "image",
                  "image": ""
              },
              "ports": [
                  {
                      "published": 5005,
                      "target": 5005
                  }
              ],
              "mounts": [
                  {
                      "type": "bind",
                      "hostPath": "./",
                      "mountPath": "/app"
                  }
              ]
          }
      },
      {
          "type": "app",
          "data": {
              "projectName": "",
              "serviceName": "actions",
              "source": {
                  "type": "image",
                  "image": ""
              },
              "ports": [
                  {
                      "published": 5055,
                      "target": 5055
                  }
              ],
              "mounts": [
                  {
                      "type": "bind",
                      "hostPath": "./app/actions",
                      "mountPath": "/app/actions"
                  }
              ]
          }
      }
  ]
}

{
  "services": [
    {
      "type": "app",
      "data": {
        "projectName": "test",
        "serviceName": "adminer",
        "source": { "type": "image", "image": "adminer" },
        "ports": [{ "published": 8080, "target": 8080 }]
      }
    },
    {
      "type": "mysql",
      "data": {
        "projectName": "test",
        "serviceName": "db",
        "rootPassword": "examplePassword",
        "password": "examplePasswordNonRoot"
      }
    }
  ]
}