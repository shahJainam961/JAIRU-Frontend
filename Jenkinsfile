pipeline{
    environment{
            DOCKERHUB = credentials('MURPHY_DOCKER_HUB_CREDS')
            ANSIBLE_VAULT_PASSWORD = credentials('ANSIBLE_VAULT_PASSWORD')
    }
    agent any
    stages{
        stage("Git Cloning Stage"){
            steps{
                git 'https://github.com/shahJainam961/JAIRU-Frontend.git'
            }
        }
        stage("Docker Login"){
            steps{
               sh 'docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW'
            }
        }
        stage("Building Docker Image"){
            steps{
                sh 'docker build -t murphy961/jairu-frontend:1.0 .'
            }
        }
        stage("Pushing Docker Image on DockerHub"){
            steps{
                sh 'docker push murphy961/jairu-frontend:1.0'
            }
        }
        stage("Ansible Stage"){
            steps{
                ansiblePlaybook(
                inventory: 'inventory',
                playbook: 'playbook.yaml',
                vaultCredentialsId: 'ANSIBLE_VAULT_PASSWORD')
            }
        }
    }
}
