#!/bin/sh
curl -H "Content-Type: application/json" -X POST -d '{"city":"Denver","company":"Josh.ai", "description": "Develop device drivers", "email": "jobs@jstar.ai", "how": "Send an email to jobs@jstar.ai", "remote": false, "title": "Software Engineer", "url": "josh.ai"}' http://localhost:8080/post-job
#curl -H "Content-Type: application/json" -X POST -d '{"city":"Denver","company":"Josh.ai", "description": "Develop device drivers", "email": "jobs@jstar.ai", "how": "Send an email to jobs@jstar.ai", "remote": false, "title": "Software Engineer", "url": "josh.ai"}' https://coloradogeekjobs-backend.herokuapp.com/post-job

