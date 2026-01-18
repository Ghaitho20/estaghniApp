{{- define "k8s-mainfest.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "k8s-mainfest.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "k8s-mainfest.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
