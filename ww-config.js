export default {
  editor: {
    label: {
      en: 'Rich Text Editor',
      'pt-BR': 'Editor de Texto Rico',
    },
    icon: 'edit',
  },
  properties: {
    initialContent: {
      label: {
        en: 'Initial Content',
        'pt-BR': 'Conteúdo Inicial',
      },
      type: 'Text',
      section: 'settings',
      defaultValue: '<p>Comece a digitar aqui...</p>',
    },
    editorHeight: {
      label: {
        en: 'Editor Height',
        'pt-BR': 'Altura do Editor',
      },
      type: 'Number',
      section: 'settings',
      defaultValue: 300,
    },
    showToolbar: {
      label: {
        en: 'Show Toolbar',
        'pt-BR': 'Mostrar Barra de Ferramentas',
      },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    primaryColor: {
      label: {
        en: 'Primary Color',
        'pt-BR': 'Cor Primária',
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#3B82F6',
    },
    borderColor: {
      label: {
        en: 'Border Color',
        'pt-BR': 'Cor da Borda',
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#E5E7EB',
    },
    editable: {
      label: {
        en: 'Editable',
        'pt-BR': 'Editável',
      },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
    },
  },
  bindingSourceProperties: {
    value: {
      label: {
        en: 'Content',
        'pt-BR': 'Conteúdo',
      },
    },
  },
  bindingTargetProperties: {
    value: {
      label: {
        en: 'Content',
        'pt-BR': 'Conteúdo',
      },
      defaultValue: '',
    },
  },
  states: ['focus', 'readonly'],
  actions: [
    {
      label: {
        en: 'Focus element',
        'pt-BR': 'Focar elemento',
      },
      action: 'focusInput',
    },
  ],
  triggerEvents: [
    {
      name: 'change',
      label: {
        en: 'On change',
        'pt-BR': 'Ao mudar',
      },
      event: { value: '' },
      default: true,
    },
    {
      name: 'initValueChange',
      label: {
        en: 'On init value change',
        'pt-BR': 'Ao inicializar valor',
      },
      event: { value: '' },
    },
    {
      name: 'onEnterKey',
      label: {
        en: 'On enter key',
        'pt-BR': 'Ao pressionar Enter',
      },
      event: { value: '' },
    },
    {
      name: 'focus',
      label: {
        en: 'On focus',
        'pt-BR': 'Ao focar',
      },
      event: { value: '' },
    },
    {
      name: 'blur',
      label: {
        en: 'On blur',
        'pt-BR': 'Ao perder foco',
      },
      event: { value: '' },
    },
  ],
};
