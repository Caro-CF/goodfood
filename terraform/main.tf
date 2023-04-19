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

resource "azurerm_resource_group" "rg-goodfood" { # ne pas changer l'identifiant, sinon remplacement des ressources
  name     = "rg-cfo-${var.project_name}"
  location = var.location
}
