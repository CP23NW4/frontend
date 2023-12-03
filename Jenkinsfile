pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('punchsppt')
        AWS_CREDENTIALS = credentials('162388f4-a518-4c1c-b5f3-9d4102d42fbb')
    }

    stages {
        stage('Checkout') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'punchsppt', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                        // Clone your private GitHub repository using the credentials
                        sh "git clone https://$USERNAME:$PASSWORD@github.com/CP23NW4/frontend.git"
            }
        }

        stage('Build and Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Deploy to AWS Amplify') {
            steps {
                script {
                    def amplifyApp = sh(script: 'amplifyApp=frontend', returnStatus: true).trim()
                    sh "npm run build"  // Or any other build command you use
                    sh "amplify publish --simple --yes"
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: 'Frontend CI/CD Pipeline Success',
                body: 'Your frontend application was successfully built and deployed to AWS Amplify.',
                recipientProviders: [emailextRecipients([[$class: 'CulpritsRecipientProvider']])]
            )
        }

        failure {
            emailext(
                subject: 'Frontend CI/CD Pipeline Failure',
                body: 'Your frontend application failed to build or deploy to AWS Amplify.',
                recipientProviders: [emailextRecipients([[$class: 'CulpritsRecipientProvider']])]
            )
        }
    }
}
