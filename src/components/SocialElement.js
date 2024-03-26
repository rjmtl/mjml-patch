// Specs: https://mjml.io/documentation/#mjml-social
import { isComponentType } from './utils.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-social-element';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: editor.I18n.t('grapesjs-mjml.components.names.socialElement'),
        draggable: '[data-gjs-type=mj-social]',
        stylable: [
          'icon-size', 'text-decoration', 'align', 'font-family', 'font-size', 'line-height',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'background-color',
          'color',
          'vertical-align',
        ],
        'style-default': {
          'align': 'center',
          'font-size': '13px',
          'line-height': '22px',
          'vertical-align': 'middle',
        },
        traits: [
          {
            type: 'select',
            label: 'Icon',
            name: 'name',
            options: [
              { value: 'custom', name: 'Custom' },
              { value: 'facebook-noshare', name: 'Facebook' },
              { value: 'twitter-noshare', name: 'Twitter' },
              { value: 'google-noshare', name: 'Google' },
              { value: 'instagram-noshare', name: 'Instagram' },
              { value: 'web-noshare', name: 'Web' },
              { value: 'youtube-noshare', name: 'Youtube' },
              { value: 'pinterest-noshare', name: 'Pinterest' },
              { value: 'linkedin-noshare', name: 'Linkedin' },
              { value: 'snapchat-noshare', name: 'Snapchat' },
              { value: 'vimeo-noshare', name: 'Vimeo' },
              { value: 'tumblr-noshare', name: 'Tumblr' },
              { value: 'github-noshare', name: 'Github' },
              { value: 'soundcloud-noshare', name: 'SoundCloud' },
              { value: 'medium-noshare', name: 'Medium' },
              { value: 'dribbble-noshare', name: 'Dribbble' },
              { value: 'xing-noshare', name: 'Xing' },
            ]
          },
          { name: 'src' },
          { name: 'href' },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; float: none; display: inline-table;',
      },

      getMjmlTemplate() {
        let parentView = this.model.parent().view;
        if (parentView.getInnerMjmlTemplate) {
          let mjmlSocial = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body><mj-column>${mjmlSocial.start}`,
            end: `${mjmlSocial.end}</mj-column></mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body><mj-column><mj-social>`,
            end: `</mj-social></mj-column></mj-body></mjml>`,
          };
        }
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('tr > td > table').innerHTML;
      },

      getChildrenSelector() {
        return 'img';
      }
    },
  });
};
