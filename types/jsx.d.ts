import { Visible } from './directives';
type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
type PointerEvents = 'bounding-box' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'none';
type Align = 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin' | 'xMinYMid' | 'xMidYMid' | 'xMaxYMid' | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax';
type AlignBaseLine = 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
type Cursor = 'auto' | 'crosshair' | 'default' | 'pointer' | 'move' | 'e-resize' | 'ne-resize' | 'nw-resize' | 'n-resize' | 'se-resize' | 'sw-resize' | 's-resize' | 'w-resize' | 'text' | 'wait' | 'help' | 'inherit' | string;
type DominantBaseline = 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
type PreserveAspectRatio = Align | `${Align} meet` | `${Align} slice`;
export interface SyntheticEvent<T> {
    currentTarget: EventTarget & T;
    target: EventTarget;
    preventDefault(): void;
    stopPropagation(): void;
}
export interface FormEvent<T> extends SyntheticEvent<T> {
}
export interface MouseEvent<T> extends SyntheticEvent<T> {
}
export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier).
     * for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).
     * for possible values
     */
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
}
export type EventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
export type FormEventHandler<T> = EventHandler<FormEvent<T>>;
export type MouseEventHandler<T> = EventHandler<MouseEvent<T>>;
export type VueAttributeClass = string | {
    [key: string]: boolean;
} | Array<string | {
    [key: string]: boolean;
}>;
export interface VueRenderOnAttribute {
    [key: string]: (...args: any[]) => void;
}
export interface VueRenderAttributes {
    class?: VueAttributeClass;
    on?: VueRenderOnAttribute;
    key?: number | string;
    ref?: string;
    slot?: string;
    'v-visible'?: Visible;
}
export interface DOMAttributes<T> {
    onClick?: MouseEventHandler<T>;
    onChange?: FormEventHandler<T>;
    onInput?: FormEventHandler<T>;
}
export interface AriaAttributes<T> extends DOMAttributes<T> {
    /** Identifies the currently active element when DOM focus is on a
     *  composite widget, textbox, group, or application.
     */
    'aria-activedescendant'?: string;
    /** Indicates whether assistive technologies will present all, or only
     *  parts of, the changed region based on the change notifications defined
     * by the aria-relevant attribute.
     */
    'aria-atomic'?: boolean | 'false' | 'true';
    /**
     * Indicates whether inputting text could trigger display of one or more
     * predictions of the user's intended value for an input and specifies how
     * predictions would be presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    /** Indicates an element is being modified and that assistive technologies
     * MAY want to wait until the modifications are complete before exposing
     * them to the user.
     */
    'aria-busy'?: boolean | 'false' | 'true';
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and
     * other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number;
    /**
     * Defines an element's column index or position with respect to the total
     * number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: boolean | 'false' | 'true';
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: boolean | 'false' | 'true';
    /**
     * Identifies the next element (or elements) in an alternate reading order
     * of content which, at the user's discretion, allows assistive technology
     * to override the general default of reading in document source order.
     */
    'aria-flowto'?: string;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: boolean | 'false' | 'true';
    /** Indicates the availability and type of interactive popup element, such
     * as menu or dialog, that can be triggered by an element.
     */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: boolean | 'false' | 'true';
    /**
     * Indicates the entered value does not conform to the format expected by
     * the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    /** Indicates keyboard shortcuts that an author has implemented to activate
     * or give focus to an element.
     */
    'aria-keyshortcuts'?: string;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number;
    /** Indicates that an element will be updated, and describes the types of
     * updates the user agents, assistive technologies, and user can expect
     * from the live region.
     */
    'aria-live'?: 'off' | 'assertive' | 'polite';
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: boolean | 'false' | 'true';
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: boolean | 'false' | 'true';
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: boolean | 'false' | 'true';
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical';
    /**
     * Identifies an element (or elements) in order to define a visual,
     * functional, or contextual parent/child relationship between DOM
     * elements where the DOM hierarchy cannot be used to represent the
     * relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user
     * with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string;
    /**
     * Defines an element's number or position in the current set of listitems
     * or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: boolean | 'false' | 'true';
    /**
     * Indicates what notifications the user agent will trigger when the
     * accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals';
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: boolean | 'false' | 'true';
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number;
    /**
     * Defines an element's row index or position with respect to the total
     * number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: boolean | 'false' | 'true';
    /**
     * Defines the number of items in the current set of listitems or treeitems.
     * Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number;
    /** Indicates if items in a table or grid are sorted in ascending or
     * descending order.
     */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number;
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number;
    /** Defines the human readable text alternative of aria-valuenow for a
     * range widget.
     */
    'aria-valuetext'?: string;
}
export interface HTMLAttributes<T> extends AriaAttributes<T>, DOMAttributes<T>, VueRenderAttributes {
    accessKey?: string;
    contentEditable?: boolean | 'inherit';
    contextMenu?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    lang?: string;
    slot?: string;
    spellCheck?: boolean;
    style?: string;
    tabIndex?: number;
    title?: string;
    inputMode?: string;
    is?: string;
    radioGroup?: string;
    role?: string;
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    autocapitalize?: string;
    autocorrect?: string;
    autosave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: boolean;
}
export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    target?: string;
    type?: string;
    as?: string;
}
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}
export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    shape?: string;
    target?: string;
}
export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
}
export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: string;
    value?: string | string[] | number;
}
export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
}
export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
}
export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
}
export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}
export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}
export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    name?: string;
}
export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string;
    action?: string;
    autocomplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
}
export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string;
}
export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    frameBorder?: number | string;
    height?: number | string;
    marginHeight?: number;
    marginWidth?: number;
    name?: string;
    sandbox?: string;
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcDoc?: string;
    width?: number | string;
}
export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    height?: number | string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    useMap?: string;
    width?: number | string;
}
export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autocomplete?: string;
    autofocus?: boolean;
    capture?: boolean;
    checked?: boolean;
    crossOrigin?: CrossOrigin;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxLength?: number;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: string;
    value?: string | string[] | number;
    width?: number | string;
}
export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean;
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keyType?: string;
    keyParams?: string;
    name?: string;
}
export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    'for'?: string;
}
export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number;
}
export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    crossOrigin?: CrossOrigin;
    href?: string;
    hrefLang?: string;
    integrity?: string;
    media?: string;
    rel?: string;
    sizes?: string;
    type?: string;
}
export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}
export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
}
export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoplay?: boolean;
    controls?: boolean;
    controlsList?: string;
    crossOrigin?: CrossOrigin;
    loop?: boolean;
    mediaGroup?: string;
    muted?: boolean;
    playsinline?: boolean;
    preload?: string;
    src?: string;
}
export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}
export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
}
export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    useMap?: string;
    width?: number | string;
    wmode?: string;
}
export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
}
export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
}
export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | string[] | number;
}
export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    for?: string;
    name?: string;
}
export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | string[] | number;
}
export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | string[] | number;
}
export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    charSet?: string;
    crossOrigin?: CrossOrigin;
    defer?: boolean;
    integrity?: string;
    nonce?: string;
    src?: string;
    type?: string;
}
export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | string[] | number;
}
export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    type?: string;
}
export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
}
export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string;
    cellSpacing?: number | string;
    summary?: string;
}
export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string;
    autofocus?: boolean;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;
}
export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string;
}
export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srcLang?: string;
}
export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsInline?: boolean;
    poster?: string;
    width?: number | string;
}
export interface HTMLElements {
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: AreaHTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: AudioHTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: BaseHTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    big: HTMLAttributes<HTMLElement>;
    blockquote: BlockquoteHTMLAttributes<HTMLElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: ColHTMLAttributes<HTMLTableColElement>;
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
    data: HTMLAttributes<HTMLElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: DelHTMLAttributes<HTMLElement>;
    details: DetailsHTMLAttributes<HTMLElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: HTMLAttributes<HTMLElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: EmbedHTMLAttributes<HTMLEmbedElement>;
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: FormHTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HTMLAttributes<HTMLHRElement>;
    html: HtmlHTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
    input: InputHTMLAttributes<HTMLInputElement>;
    ins: InsHTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    keygen: KeygenHTMLAttributes<HTMLElement>;
    label: LabelHTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: LiHTMLAttributes<HTMLLIElement>;
    link: LinkHTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: MapHTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    menu: MenuHTMLAttributes<HTMLElement>;
    menuitem: HTMLAttributes<HTMLElement>;
    meta: MetaHTMLAttributes<HTMLMetaElement>;
    meter: MeterHTMLAttributes<HTMLElement>;
    nav: HTMLAttributes<HTMLElement>;
    noindex: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: ObjectHTMLAttributes<HTMLObjectElement>;
    ol: OlHTMLAttributes<HTMLOListElement>;
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
    option: OptionHTMLAttributes<HTMLOptionElement>;
    output: OutputHTMLAttributes<HTMLElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    param: ParamHTMLAttributes<HTMLParamElement>;
    picture: HTMLAttributes<HTMLElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: ProgressHTMLAttributes<HTMLProgressElement>;
    q: QuoteHTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    script: ScriptHTMLAttributes<HTMLScriptElement>;
    section: HTMLAttributes<HTMLElement>;
    select: SelectHTMLAttributes<HTMLSelectElement>;
    small: HTMLAttributes<HTMLElement>;
    source: SourceHTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: StyleHTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: TableHTMLAttributes<HTMLTableElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: TdHTMLAttributes<HTMLTableCellElement>;
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: ThHTMLAttributes<HTMLTableCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: TimeHTMLAttributes<HTMLElement>;
    title: HTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: TrackHTMLAttributes<HTMLTrackElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    'var': HTMLAttributes<HTMLElement>;
    video: VideoHTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;
}
interface SVGAttributes<T> extends AriaAttributes<T>, DOMAttributes<T>, VueRenderAttributes {
    className?: string;
    height?: number | string;
    id?: string;
    lang?: string;
    media?: string;
    method?: string;
    name?: string;
    style?: string;
    target?: string;
    type?: string;
    width?: number | string;
    role?: string;
    tabIndex?: number;
    allowReorder?: 'no' | 'yes';
    amplitude?: number | string;
    autoReverse?: boolean;
    azimuth?: number | string;
    baseFrequency?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    /** @deprecated */
    colorProfile?: number | string;
    colorRendering?: number | string;
    decelerate?: number | string;
    diffuseConstant?: number | string;
    display?: string;
    elevation?: number | string;
    /** @deprecated */
    enableBackground?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: boolean;
    /** @deprecated */
    filterRes?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: boolean | 'auto';
    format?: number | string;
    /** @deprecated */
    glyphOrientationHorizontal?: number | string;
    /** @deprecated */
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    href?: string;
    in?: string;
    intercept?: number | string;
    /** @deprecated */
    kernelUnitLength?: number | string;
    /** @deprecated */
    kerning?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    numOctaves?: number | string;
    opacity?: number | string;
    overflow?: number | string;
    pointerEvents?: PointerEvents;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    renderingIntent?: number | string;
    requiredExtensions?: number | string;
    /** @deprecated */
    requiredFeatures?: number | string;
    result?: string;
    seed?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    stitchTiles?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    transform?: string;
    visibility?: 'visible' | 'hidden' | 'collapse';
    x?: number | string;
    xlinkActuate?: string;
    /** @deprecated */
    xlinkArcrole?: string;
    /** @deprecated use href */
    xlinkHref?: string;
    /** @deprecated */
    xlinkRole?: string;
    /** @deprecated */
    xlinkShow?: string;
    /** @deprecated use title */
    xlinkTitle?: string;
    /** @deprecated */
    xlinkType?: string;
    /** @deprecated */
    xmlLang?: string;
    xmlnsXlink?: string;
    /** @deprecated */
    xmlSpace?: string;
    y?: number | string;
    z?: number | string;
}
interface SVGProps<T> extends SVGAttributes<T> {
}
interface SVGAnimationTimingAttributes {
    begin?: number | string;
    dur?: number | string;
    end?: number | string;
    min?: string;
    max?: string;
    restart?: 'always' | 'whenNotActive' | 'never';
    repeatCount?: number | string | 'indefinite';
    repeatDur?: string | 'indefinite';
    fill?: 'freeze' | 'remove';
}
interface SVGAnimationValueAttributes {
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    attributeName?: string;
    by?: number | string;
    calcMode?: 'discrete' | 'linear' | 'paced' | 'spline';
    from?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    to?: number | string;
    values?: string;
    /** @deprecated use attributeName */
    attributeType?: string;
}
interface SVGPresentationAttributes {
    /** @deprecated */
    clip?: number | string;
    clipPath?: string;
    clipRule?: 'nonzero' | 'evenodd' | 'inherit';
    color?: string | 'inherit';
    colorInterpolation?: number | string;
    colorRendering?: number | string;
    cursor?: Cursor;
    display?: string;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: number | string;
    paintOrder?: 'normal' | 'fill stroke markers' | 'fill markers stroke' | 'stroke fill markers' | 'stroke markers fill' | 'markers fill stroke' | 'markers stroke fill';
    pointerEvents?: PointerEvents;
    shapeRendering?: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision';
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    transform?: string;
    vectorEffect?: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position';
    visibility?: 'visible' | 'hidden' | 'collapse';
}
interface SVGTextAttributes {
    dominantBaseLine?: DominantBaseline;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontVariant?: number | string;
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    lengthAdjust?: number | string;
    letterSpacing?: number | string | 'normal';
    textAnchor?: 'start' | 'middle' | 'end';
    textDecoration?: string;
    textLength?: number | string;
    unicodeBidi?: number | string;
    wordSpacing?: 'normal' | number | string;
    writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
}
interface SVGSvgElementAttributes<T> extends SVGProps<T> {
    /** @deprecated */
    baseProfile?: number | string;
    /** @deprecated */
    contentScriptType?: number | string;
    /** @deprecated */
    contentStyleType?: number | string;
    height?: number | string;
    preserveAspectRatio?: PreserveAspectRatio;
    /** @deprecated It is purely advisory and has no influence on rendering or processing. */
    version?: string;
    viewBox?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
    xmlns?: 'http://www.w3.org/2000/svg' | string;
    /** @deprecated */
    zoomAndPan?: string;
}
interface SVGAnimateElementAttributes<T> extends SVGAnimationValueAttributes, SVGAnimationTimingAttributes, SVGProps<T> {
}
interface SVGAnimateMotionElementAttributes<T> extends SVGAnimationValueAttributes, SVGAnimationTimingAttributes, SVGProps<T> {
    keyPoints?: number | string;
    origin?: number | string;
    /** @experimental */
    path?: string;
    /** @experimental */
    rotate?: 'auto' | 'auto-reverse' | number;
}
interface SVGAnimateTransformElementAttributes<T> extends SVGAnimationValueAttributes, SVGAnimationTimingAttributes, SVGProps<T> {
    type?: 'translate' | 'scale' | 'rotate' | 'skewX' | 'skewY';
}
interface SVGCircleElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    cx?: number | string;
    cy?: number | string;
    pathLength?: number | string;
    r?: number | string;
}
interface SVGClipPathElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    clipPathUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}
interface SVGDefsElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
}
interface SVGEllipseElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    cx?: number | string;
    cy?: number | string;
    pathLength?: number | string;
    rx?: number | string;
    ry?: number | string;
}
interface SVGFeBlendElementAttributes<T> extends SVGProps<T> {
    in?: string;
    in2?: number | string;
    mode?: number | string;
}
interface SVGFeColorMatrixElementAttributes<T> extends SVGProps<T> {
    in?: string;
    type?: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha';
    values?: string;
}
interface SVGFeCompositeElementAttributes<T> extends SVGProps<T> {
    in?: string;
    in2?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    operator?: 'over' | 'in' | 'out' | 'atop' | 'xor' | 'lighter' | 'arithmetic';
}
interface SVGFeConvolveMatrixElementAttributes<T> extends SVGProps<T> {
    bias?: number | string;
    divisor?: number | string;
    edgeMode?: number | string;
    in?: string;
    kernelMatrix?: number | string;
    order?: number;
    preserveAlpha?: boolean;
    targetX?: number | string;
    targetY?: number | string;
}
interface SVGFeDisplacementMapElementAttributes<T> extends SVGProps<T> {
    in?: string;
    in2?: number | string;
    scale?: number | string;
    xChannelSelector?: string;
    yChannelSelector?: string;
}
interface SVGFeDropShadowElementAttributes<T> extends SVGProps<T> {
    dx?: number | string;
    dy?: number | string;
    stdDeviation?: number | string;
}
interface SVGFeGaussianBlurElementAttributes<T> extends SVGProps<T> {
    edgeMode?: number | string;
    in?: string;
    stdDeviation?: number | string;
}
interface SVGFeImageElementAttributes<T> extends SVGProps<T> {
    crossOrigin?: CrossOrigin;
    preserveAspectRatio?: PreserveAspectRatio;
}
interface SVGFeMorphologyElementAttributes<T> extends SVGProps<T> {
    in?: string;
    operator?: 'over' | 'in' | 'out' | 'atop' | 'xor' | 'lighter' | 'arithmetic';
    radius?: number | string;
}
interface SVGFeOffsetElementAttributes<T> extends SVGProps<T> {
    in?: string;
    dx?: number | string;
    dy?: number | string;
}
interface SVGFilterElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    filterUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    primitiveUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGForeignObjectElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGGElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
}
interface SVGImageElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    crossOrigin?: CrossOrigin;
    decoding?: 'auto' | 'async' | 'sync';
    height?: number | string;
    href?: string;
    imageRendering?: 'auto' | 'optimizeSpeed' | 'optimizeQuality';
    preserveAspectRatio?: PreserveAspectRatio;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGLineElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    pathLength?: number | string;
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
}
interface SVGLinearGradientElementAttributes<T> extends SVGProps<T> {
    gradientTransform?: string;
    gradientUnits?: string;
    href?: string;
    spreadMethod?: string;
    x1?: number | string;
    x2?: number | string;
    y1?: number | string;
    y2?: number | string;
}
interface SVGMarkerElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    markerHeight?: number | string;
    markerUnits?: 'userSpaceOnUse' | 'strokeWidth';
    markerWidth?: number | string;
    orient?: 'auto' | 'auto-start-reverse' | number | string;
    preserveAspectRatio?: PreserveAspectRatio;
    refX?: number | string | 'left' | 'center' | 'right';
    refY?: number | string | 'top' | 'center' | 'bottom';
    viewBox?: string;
}
interface SVGMaskElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    maskContentUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    maskUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGPathElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    d?: string;
    pathLength?: number | string;
}
interface SVGPatternElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    href?: string;
    patternContentUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    patternTransform?: string;
    patternUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    preserveAspectRatio?: PreserveAspectRatio;
    viewBox?: string;
    width?: number | string;
    x?: number | string;
    /** @deprecated use href */
    xlinkHref?: string;
    y?: number | string;
}
interface SVGPolygonElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    pathLength?: number | string;
    points?: string;
}
interface SVGPolylineElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    pathLength?: number | string;
    points?: string;
}
interface SVGRadialGradientElementAttributes<T> extends SVGProps<T> {
    cx?: number | string;
    cy?: number | string;
    fr?: number | string;
    fx?: number | string;
    fy?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    href?: string;
    r?: number | string;
    spreadMethod?: string;
}
interface SVGRectElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    pathLength?: number | string;
    rx?: number | string;
    ry?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGSetElementAttributes<T> extends SVGAnimationTimingAttributes, SVGProps<T> {
    keyPoints?: number | string;
    to?: number | string;
}
interface SVGStopElementAttributes<T> extends SVGProps<T> {
    offset?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
}
interface SVGSymbolElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    preserveAspectRatio?: PreserveAspectRatio;
    refX?: number | string | 'left' | 'center' | 'right';
    refY?: number | string | 'top' | 'center' | 'bottom';
    viewBox?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGTextElementAttributes<T> extends SVGPresentationAttributes, SVGTextAttributes, SVGProps<T> {
    direction?: 'ltr' | 'rtl';
    dx?: number | string;
    dy?: number | string;
    rotate?: number | string;
    textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
    x?: number | string;
    y?: number | string;
}
interface SVGTextPathElementAttributes<T> extends SVGPresentationAttributes, SVGTextAttributes, SVGProps<T> {
    alignmentBaseline?: AlignBaseLine;
    baselineShift?: number | string | 'sub' | 'super';
    direction?: 'ltr' | 'rtl';
    href?: string;
    /** @experimental */
    method?: 'align' | 'stretch';
    /** @experimental */
    path?: string;
    /** @experimental */
    side?: 'left' | 'right';
    spacing?: number | string;
    startOffset?: number | string;
}
interface SVGTSpanElementAttributes<T> extends SVGPresentationAttributes, SVGTextAttributes, SVGProps<T> {
    alignmentBaseline?: AlignBaseLine;
    baselineShift?: number | string | 'sub' | 'super';
    direction?: 'ltr' | 'rtl';
    dx?: number | string;
    dy?: number | string;
    rotate?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGUseElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    height?: number | string;
    href?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}
interface SVGViewElementAttributes<T> extends SVGPresentationAttributes, SVGProps<T> {
    preserveAspectRatio?: PreserveAspectRatio;
    viewBox?: string;
    /** @deprecated */
    viewTarget?: number | string;
    /** @deprecated */
    zoomAndPan?: string;
}
export interface SVGElements {
    svg: SVGSvgElementAttributes<SVGSVGElement>;
    animate: SVGAnimateElementAttributes<SVGAnimateElement>;
    animateMotion: SVGAnimateMotionElementAttributes<SVGElement>;
    animateTransform: SVGAnimateTransformElementAttributes<SVGAnimateTransformElement>;
    circle: SVGCircleElementAttributes<SVGCircleElement>;
    clipPath: SVGClipPathElementAttributes<SVGClipPathElement>;
    defs: SVGDefsElementAttributes<SVGDefsElement>;
    desc: SVGProps<SVGDescElement>;
    ellipse: SVGEllipseElementAttributes<SVGEllipseElement>;
    feBlend: SVGFeBlendElementAttributes<SVGFEBlendElement>;
    feColorMatrix: SVGFeColorMatrixElementAttributes<SVGFEColorMatrixElement>;
    feComponentTransfer: SVGProps<SVGFEComponentTransferElement>;
    feComposite: SVGFeCompositeElementAttributes<SVGFECompositeElement>;
    feConvolveMatrix: SVGFeConvolveMatrixElementAttributes<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGProps<SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGFeDisplacementMapElementAttributes<SVGFEDisplacementMapElement>;
    feDistantLight: SVGProps<SVGFEDistantLightElement>;
    feDropShadow: SVGFeDropShadowElementAttributes<SVGFEDropShadowElement>;
    feFlood: SVGProps<SVGFEFloodElement>;
    feFuncA: SVGProps<SVGFEFuncAElement>;
    feFuncB: SVGProps<SVGFEFuncBElement>;
    feFuncG: SVGProps<SVGFEFuncGElement>;
    feFuncR: SVGProps<SVGFEFuncRElement>;
    feGaussianBlur: SVGFeGaussianBlurElementAttributes<SVGFEGaussianBlurElement>;
    feImage: SVGFeImageElementAttributes<SVGFEImageElement>;
    feMerge: SVGProps<SVGFEMergeElement>;
    feMergeNode: SVGProps<SVGFEMergeNodeElement>;
    feMorphology: SVGFeMorphologyElementAttributes<SVGFEMorphologyElement>;
    feOffset: SVGFeOffsetElementAttributes<SVGFEOffsetElement>;
    fePointLight: SVGProps<SVGFEPointLightElement>;
    feSpecularLighting: SVGProps<SVGFESpecularLightingElement>;
    feSpotLight: SVGProps<SVGFESpotLightElement>;
    feTile: SVGProps<SVGFETileElement>;
    feTurbulence: SVGProps<SVGFETurbulenceElement>;
    filter: SVGFilterElementAttributes<SVGFilterElement>;
    foreignObject: SVGForeignObjectElementAttributes<SVGForeignObjectElement>;
    g: SVGGElementAttributes<SVGGElement>;
    image: SVGImageElementAttributes<SVGImageElement>;
    line: SVGLineElementAttributes<SVGLineElement>;
    linearGradient: SVGLinearGradientElementAttributes<SVGLinearGradientElement>;
    marker: SVGMarkerElementAttributes<SVGMarkerElement>;
    mask: SVGMaskElementAttributes<SVGMaskElement>;
    metadata: SVGProps<SVGMetadataElement>;
    mpath: SVGProps<SVGElement>;
    path: SVGPathElementAttributes<SVGPathElement>;
    pattern: SVGPatternElementAttributes<SVGPatternElement>;
    polygon: SVGPolygonElementAttributes<SVGPolygonElement>;
    polyline: SVGPolylineElementAttributes<SVGPolylineElement>;
    radialGradient: SVGRadialGradientElementAttributes<SVGRadialGradientElement>;
    rect: SVGRectElementAttributes<SVGRectElement>;
    set: SVGSetElementAttributes<SVGStopElement>;
    stop: SVGStopElementAttributes<SVGStopElement>;
    switch: SVGProps<SVGSwitchElement>;
    symbol: SVGSymbolElementAttributes<SVGSymbolElement>;
    text: SVGTextElementAttributes<SVGTextElement>;
    textPath: SVGTextPathElementAttributes<SVGTextPathElement>;
    tspan: SVGTSpanElementAttributes<SVGTSpanElement>;
    use: SVGUseElementAttributes<SVGUseElement>;
    view: SVGViewElementAttributes<SVGViewElement>;
}
export interface IntrinsicElements extends HTMLElements, SVGElements {
}
export {};
