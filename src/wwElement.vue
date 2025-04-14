<template>
  <div class="tiptap-editor-container" :style="containerStyle">
    <div v-if="content.showToolbar" class="tiptap-toolbar">
      <div class="button-group">
        <button @click="execCommand('bold')">
          <span class="icon">B</span>
        </button>
        <button @click="execCommand('italic')">
          <span class="icon">I</span>
        </button>
        <button @click="execCommand('strikeThrough')">
          <span class="icon">S</span>
        </button>
        <span class="divider"></span>
        <button @click="execCommand('formatBlock', '<p>')">
          <span class="icon">¶</span>
        </button>
        <button @click="execCommand('formatBlock', '<h1>')">
          <span class="icon">H1</span>
        </button>
        <button @click="execCommand('formatBlock', '<h2>')">
          <span class="icon">H2</span>
        </button>
        <span class="divider"></span>
        <button @click="execCommand('insertUnorderedList')">
          <span class="icon">•</span>
        </button>
        <button @click="execCommand('insertOrderedList')">
          <span class="icon">1.</span>
        </button>
        <button @click="execCommand('formatBlock', '<blockquote>')">
          <span class="icon">"</span>
        </button>
        <span class="divider"></span>
        <button @click="execCommand('foreColor', content.primaryColor)" 
          :style="{ color: content.primaryColor }">
          <span class="icon">A</span>
        </button>
        <span class="divider"></span>
        <button @click="execCommand('undo')">
          <span class="icon">↶</span>
        </button>
        <button @click="execCommand('redo')">
          <span class="icon">↷</span>
        </button>
      </div>
    </div>
    <div class="tiptap-editor-content" :style="editorStyle">
      <div 
        ref="editorContent" 
        class="tiptap-content" 
        :class="{ 'read-only': !isEditable }" 
        :contenteditable="isEditable"
        @input="handleInput"
        @focus="$emit('editor:focus')"
        @blur="$emit('editor:blur')"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
  },
  
  data() {
    return {
      currentHtml: '',
    }
  },
  
  computed: {
    containerStyle() {
      return {
        '--primary-color': this.content.primaryColor || '#3B82F6',
        '--border-color': this.content.borderColor || '#E5E7EB',
      }
    },
    editorStyle() {
      return {
        height: `${this.content.editorHeight || 300}px`,
      }
    },
    isEditable() {
      if (this.content.hasOwnProperty('editable')) {
        return !!this.content.editable;
      }
      return true;
    }
  },
  
  watch: {
    'content.value': {
      handler(value) {
        if (this.$refs.editorContent && value !== this.currentHtml) {
          this.$refs.editorContent.innerHTML = value || '';
        }
      },
      immediate: true
    },
    'content.initialContent': {
      handler(newValue) {
        if (this.$refs.editorContent && !this.content.value) {
          this.$refs.editorContent.innerHTML = newValue || '';
        }
      }
    },
    isEditable: {
      handler(editable) {
        if (this.$refs.editorContent) {
          this.$refs.editorContent.contentEditable = editable;
        }
      }
    }
  },
  
  mounted() {
    this.setupEditor();
  },
  
  methods: {
    setupEditor() {
      setTimeout(() => {
        if (this.$refs.editorContent) {
          this.$refs.editorContent.innerHTML = this.content.value || this.content.initialContent || '<p>Comece a digitar aqui...</p>';
        }
      }, 10);
    },
    
    execCommand(command, value) {
      try {
        document.execCommand(command, false, value);
        this.handleInput();
      } catch (error) {
        console.error(`Erro ao executar comando: ${command}`, error);
      }
    },
    
    handleInput() {
      if (!this.$refs.editorContent) return;
      
      const html = this.$refs.editorContent.innerHTML;
      const isEmpty = !this.$refs.editorContent.textContent.trim();
      
      this.currentHtml = html;
      
      this.$emit('update:content', { value: html });
      this.$emit('editor:update', { html, isEmpty });
    }
  }
};
</script>

<style lang="scss" scoped>
.tiptap-editor-container {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .tiptap-toolbar {
    padding: 8px;
    border-bottom: 1px solid var(--border-color);
    background-color: #f8f8f8;
    
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      
      button {
        height: 30px;
        width: 30px;
        padding: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background-color: #f1f1f1;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .icon {
          font-size: 14px;
          font-weight: bold;
        }
      }
      
      .divider {
        width: 1px;
        background-color: #ddd;
        margin: 0 4px;
      }
    }
  }
  
  .tiptap-editor-content {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
    
    .tiptap-content {
      min-height: 100%;
      outline: none;
      
      &.read-only {
        opacity: 0.9;
        cursor: default;
      }
      
      &[contenteditable=true]:focus {
        outline: none;
      }
      
      /* List styles */
      ul,
      ol {
        padding: 0 1rem;
        margin: 1rem;
      }
    
      /* Heading styles */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.1;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
      }
    
      h1 {
        font-size: 1.4rem;
      }
    
      h2 {
        font-size: 1.2rem;
      }
    
      h3 {
        font-size: 1.1rem;
      }
    
      h4,
      h5,
      h6 {
        font-size: 1rem;
      }
    
      /* Code and preformatted text styles */
      pre {
        background: #333;
        border-radius: 0.5rem;
        color: white;
        font-family: monospace;
        margin: 1rem 0;
        padding: 0.75rem 1rem;
      }
    
      blockquote {
        border-left: 3px solid #ccc;
        margin: 1rem 0;
        padding-left: 1rem;
      }
    
      hr {
        border: none;
        border-top: 1px solid #eee;
        margin: 1rem 0;
      }
    }
  }
}
</style>
