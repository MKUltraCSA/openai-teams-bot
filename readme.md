# Deploy Infrastructure - Execute in the infrastructure folder

## Create an Azure AD app registration

```bash
appRegistration=$(az ad app create --display-name "NAME OF APP REG" --end-date "2099-12-31T23:59:59Z")
```

### Set clientID Variable

```bash
clientID=$(echo $appRegistration | jq -r '.appId')
```

## Create an Azure AD app registration password

```bash
appRegistrationSecret=$(az ad app credential reset --id $clientID)
```

### Set cientSecret Variable

```bash
clientSecret=$(echo $appRegistrationSecret | jq -r '.password')
```

## Create a resource group

```bash
resourceGroupName="YOUR RG HERE"
az group create --name $resourceGroupName --location eastus
````

## Set remaining params

```bash
resourceBaseName="pwshbot"
webAppSKU="B1"
botDisplayName="pwshbot"
```

## Set bicep template path

```bash
templateFilePath="azure.bicep"
```

## deploy template

```bash
az deployment group create --resource-group $resourceGroupName --template-file $templateFilePath --parameters resourceBaseName=$resourceBaseName botAadAppClientId=$clientID botAadAppClientSecret=$clientSecret webAppSKU=$webAppSKU botDisplayName=$botDisplayName
```

# Deploy Code

```bash
az webapp deployment source config-zip --resource-group $resourceGroupName --name $resourceBaseName --src app.zip
```

# To test the bot

Navigate to Azude Bot Service that was created in the resource group

select channels and click open in teams using the link in the Actions colum of the teams channel
