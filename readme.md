# Deploy Infrastructure - Execute in the infrastructure folder

## Create an Azure AD app registration
appRegistration=$(az ad app create --display-name "pwshbot" --end-date "2099-12-31T23:59:59Z")

### Set clientID Variable
clientID=$(echo $appRegistration | jq -r '.appId')

## Create an Azure AD app registration password
appRegistrationSecret=$(az ad app credential reset --id $clientID)

### Set cientSecret Variable
clientSecret=$(echo $appRegistrationSecret | jq -r '.password')

## Create a resource group
resourceGroupName="YOUR RG HERE"
az group create --name $resourceGroupName --location eastus

## Set remaining params
resourceBaseName="pwshbot"
webAppSKU="B1"
botDisplayName="pwshbot"

## Set bicep template path
templateFilePath="azure.bicep"

## deploy template
az deployment group create --resource-group $resourceGroupName --template-file $templateFilePath --parameters resourceBaseName=$resourceBaseName botAadAppClientId=$clientID botAadAppClientSecret=$clientSecret webAppSKU=$webAppSKU botDisplayName=$botDisplayName

# Deploy Code

az webapp deployment source config-zip --resource-group $resourceGroupName --name $resourceBaseName --src app.zip


# To test the bot

Navigate to Azude Bot Service that was created in the resource group

select channels and click open in teams using the link in the Actions colum of the teams channel
