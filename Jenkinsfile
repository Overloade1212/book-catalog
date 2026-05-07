pipeline {
    agent any

    stages {

        stage('Install') {
            steps {
                sh '''
                docker run --rm \
                  -v $PWD:/app \
                  -w /app \
                  node:20 \
                  npm install
                '''
            }
        }

        stage('Static Analysis') {
            steps {
                sh '''
                docker run --rm \
                  -v $PWD:/app \
                  -w /app \
                  node:20 \
                  npm run lint
                '''
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
                sh '''
                docker run --rm \
                  -v $PWD:/app \
                  -w /app \
                  node:20 \
                  npm run build
                '''
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
                archiveArtifacts artifacts: 'dist/**',