pipeline{
    agent any
    stages{
        stage("Git Cloning Stage"){
            steps{
                git 'https://github.com/shahJainam961/JAIRU-Frontend.git'
            }
        }
        stage("Docker Login"){
            steps{
                sh 'docker login -u "murphy961" -p "Dockerhub@961"'
            }
        }
        stage("Building Docker Image"){
            steps{
                sh 'docker build -t murphy961/jairu-frontend:1.0 .'
            }
        }
        stage("Pushing Docker Image on DockerHub"){
            steps{
                sh ''docker push murphy961/jairu-frontend:1.0'
            }
        }
        stage("Ansible Stage"){
            steps{
                sh 'ansible-playbook -i inventory playbook.yaml'
            }
        }
    }
}

