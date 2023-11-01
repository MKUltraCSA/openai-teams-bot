# Create an Azure AD app registration
appRegistration=$(az ad app create --display-name "pwshbot" --end-date "2099-12-31T23:59:59Z")
appRegistrationSecret=$(az ad app credential reset --id $clientID)

# Retrieve the client ID and secret of the app registration
clientID=$(echo $appRegistration | jq -r '.appId')
clientSecret=$(echo $appRegistrationSecret | jq -r '.password')

# Deploy the Bicep file with the client ID and secret
resourceGroupName="rg-lockedDownChatBot-prod2"
location="eastus"
templateFilePath="azure.bicep"
resourceBaseName="pwshbot"
webAppSKU="B1"
botDisplayName="pwshbot"

# print all the variables
echo "Client ID: $clientID"
echo "Client Secret: $clientSecret"
echo "Resource Group Name: $resourceGroupName"
echo "Location: $location"
echo "Template File Path: $templateFilePath"
echo "Resource Base Name: $resourceBaseName"
echo "Web App SKU: $webAppSKU"
echo "Bot Display Name: $botDisplayName"

az deployment group create --resource-group $resourceGroupName --template-file $templateFilePath --parameters resourceBaseName=$resourceBaseName botAadAppClientId=$clientID botAadAppClientSecret=$clientSecret webAppSKU=$webAppSKU botDisplayName=$botDisplayName