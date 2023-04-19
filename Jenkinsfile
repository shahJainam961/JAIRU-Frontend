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
                sh 'npm i --legacy-peer-deps'
                sh 'ng b'
            }
        }
        stage("Testing Stage"){
            steps{
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
                sh 'ansible-playbook -i inventory playbook.yaml'
            }
        }
    }
}
