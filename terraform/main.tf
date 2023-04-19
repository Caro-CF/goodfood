terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.52.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-caroline-fouquet"
    storage_account_name = "stcfotfstate01"
    container_name       = "tfstate"
    key                  = "infra-goodfood.tfstate"
  }
}

provider "azurerm" {
  # Configuration options
  features {

  }
}

###############
# ressource azure
###############

# Resource Group
resource "azurerm_resource_group" "rg-goodfood" { # ne pas changer l'identifiant, sinon remplacement des ressources
  name     = "rg-cfo-${var.project_name}"
  location = var.location
}

#App Service Plan
resource "azurerm_service_plan" "plan-goodfood" {
  name                = "plan-cfo-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  location            = azurerm_resource_group.rg-goodfood.location
  os_type             = "Linux"
  sku_name            = "F1"
}

#Web Appp Linux
resource "azurerm_linux_web_app" "webapp-hello" {
  name                = "web-hello-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  location            = azurerm_service_plan.plan-goodfood.location
  service_plan_id     = azurerm_service_plan.plan-goodfood.id

  site_config {}
}

resource "azurerm_linux_web_app" "webapp-world" {
  name                = "web-world-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  location            = azurerm_service_plan.plan-goodfood.location
  service_plan_id     = azurerm_service_plan.plan-goodfood.id

  site_config {}
}
