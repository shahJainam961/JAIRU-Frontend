pipeline{
    agent any
    stages{
        stage("Git Cloning Stage"){
            steps{
                git 'https://github.com/shahJainam961/JAIRU-Frontend.git'
            }
        }
        stage("Building Stage"){
            steps{
                sh 'echo Building'
            }
        }
        stage("Testing Stage"){
            steps{
              sh 'echo Testing'
            }
        }
        stage("build image"){
            steps{
                sh 'docker login -u "murphy961" -p "Dockerhub@961"'
                sh 'docker build -t murphy961/jairu-frontend:1.0 .'
                sh 'docker push murphy961/jairu-frontend:1.0'
            }
        }
        stage("Ansible Stage"){
            steps{
                sh 'echo jainam'
            }
        }
    }
}
