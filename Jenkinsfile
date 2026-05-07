pipeline {
    agent {
        docker {
            image 'node:20'
            reuseNode true
        }
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Static Analysis') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build (develop & master)') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }
}