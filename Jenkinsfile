pipeline {
    agent any

    stages {
        stage('build')

        {
            steps    {
                dir('Assignment')
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
