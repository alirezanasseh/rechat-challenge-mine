export interface ILayoutProps {
    title?: string;
}

export interface IFormElements {
    type?: string;
    text?: string;
    variant?: string;
    required?: boolean;
    additional_classes?: string;
    additional_parent_classes?: string;
    [x: string]: any;
}

export interface IUIElement {
    variant?: 'primary' | 'default' | 'error';
    block?: 'true' | 'false';
    [x: string]: any;
}

export interface IIcon {
    width?: string;
    height?: string;
    color?: string;
    additional_classes?: string;
}
