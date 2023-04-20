variable "project_name" {
  type        = string
  description = "nom du projet"
}

variable "location" {
  type        = string
  description = "emplacement géographique où seront créées les ressources"
}

variable "RABBITMQ_DEFAULT_USER" {
  type = string
}

variable "RABBITMQ_DEFAULT_PASS" {
  type = string
}
