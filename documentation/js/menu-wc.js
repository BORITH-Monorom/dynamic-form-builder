'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dynamic-form-builder documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckboxField.html" data-type="entity-link" >CheckboxField</a>
                            </li>
                            <li class="link">
                                <a href="components/DateField.html" data-type="entity-link" >DateField</a>
                            </li>
                            <li class="link">
                                <a href="components/DynamicOptions.html" data-type="entity-link" >DynamicOptions</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldButton.html" data-type="entity-link" >FieldButton</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldPreview.html" data-type="entity-link" >FieldPreview</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldSettings.html" data-type="entity-link" >FieldSettings</a>
                            </li>
                            <li class="link">
                                <a href="components/FormEditor.html" data-type="entity-link" >FormEditor</a>
                            </li>
                            <li class="link">
                                <a href="components/FormElementMenu.html" data-type="entity-link" >FormElementMenu</a>
                            </li>
                            <li class="link">
                                <a href="components/FormFieldComponent.html" data-type="entity-link" >FormFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormPreview.html" data-type="entity-link" >FormPreview</a>
                            </li>
                            <li class="link">
                                <a href="components/MainCanvas.html" data-type="entity-link" >MainCanvas</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectField.html" data-type="entity-link" >SelectField</a>
                            </li>
                            <li class="link">
                                <a href="components/TextField.html" data-type="entity-link" >TextField</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FieldTypesService.html" data-type="entity-link" >FieldTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormService.html" data-type="entity-link" >FormService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FieldSettingsDefinition.html" data-type="entity-link" >FieldSettingsDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldTypeDefinition.html" data-type="entity-link" >FieldTypeDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormField.html" data-type="entity-link" >FormField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormRow.html" data-type="entity-link" >FormRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OptionItem.html" data-type="entity-link" >OptionItem</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});