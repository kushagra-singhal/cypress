pipeline {
    agent any

    stages {
        stage('build')

        {
            steps    {
                dir('/home/kushas/Documents/Learnings/Cypress/cypress-assignment/cypress/e2e/Assignment')
                {
                    /* execute commands in the scripts directory */

                    sh 'npm install typescript'

                    sh 'npm install cypress --save-dev'

                    sh 'npm run cypress:run'
                }
            }
        }
    }
}
