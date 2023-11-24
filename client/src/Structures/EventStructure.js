export const EventStructure = [
    {
      label: "Título",
      type: "text",
      id: "title",
      placeholder: "Digite un título",
      required: true,
    },
    {
      label: "Categoría",
      type: "select",
      id: "category",
      placeholder: "Seleccione una categoría",
      required: true,
      options: [
        {
          value: "Otro",
          label: "Otro",
        },
        {
          value: "Servicio",
          label: "Servicio",
        },
        {
          value: "Entrega",
          label: "Entrega",
        }
      ]
    },
    {
      label: "Inicio",
      type: "datetime-local",
      id: "startTime",
      placeholder: "",
      required: true,
    },
    {
      label: "Finalización",
      type: "datetime-local",
      id: "endTime",
      placeholder: "",
      required: true,
    },
    {
      label: "Descripción",
      type: "textarea",
      id: "description",
      placeholder: "Digite una descripción",
      required: true,
    }
  ];
  