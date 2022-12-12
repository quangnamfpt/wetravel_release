// #!/usr/bin/env groovy
node {
 properties([disableConcurrentBuilds()])
 try {
   namespace = "default"
   projectId = "c-nbmtj:p-dkxjr"
   deployment = "we-travel-frontend"
   dockerFile = "Dockerfile"
   imageName = "we-travel-frontend"
   registry = "chjplove"
   version = "latest"
   stage('Checkout Branch') {
       checkout scm
       sh "git checkout ${env.BRANCH_NAME} && git reset --hard origin/${env.BRANCH_NAME}"
   }
   stage('Build Image') {
       sh "docker build -t ${registry}/${imageName}:${version} -f ${dockerFile} ."
   }
   stage('Push Image') {
       sh "docker tag ${registry}/${imageName}:${version} ${registry}/${imageName}:${version}"
       sh "docker login -u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} docker.io"
       sh "docker push ${registry}/${imageName}:${version}"
   }
   switch(env.BRANCH_NAME) {
       case 'develop':
            stage("Deploy") {
//                 sh "echo ${env.BRANCH_NAME}"
//                 sh """curl -k --location --request POST '${env.RANCHER_API_URL}/project/${projectId}/workloads/deployment:${namespace}:${deployment}?action=redeploy' \
//                         --header 'Authorization: Bearer ${env.RANCHER_API_TOKEN}'"""
            }
            break;

       case 'uat':
//             stage("Deploy") {
//                 sh "echo ${env.BRANCH_NAME}"
//             }
            break;

       case 'main':
           stage("Deploy") {
                sh """curl -k --location --request POST '${env.RANCHER_API_URL}/project/${clusterId}:${projectId}/workloads/deployment:${namespace}:${deployment}?action=redeploy' \
                        --header 'Authorization: Bearer ${env.RANCHER_API_TOKEN}'"""
           }
           break;
   }
 } catch (e) {
   currentBuild.result = "FAILED"
   throw e
 }
}