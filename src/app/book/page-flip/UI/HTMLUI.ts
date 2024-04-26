import { UI } from "./UI";
import { PageFlip } from "../PageFlip";
import { FlipSetting } from "../Settings";

/**
 * UI for HTML mode
 */
export class HTMLUI extends UI {
  private items: NodeListOf<HTMLElement> | HTMLElement[];

  constructor(
    inBlock: HTMLElement,
    app: PageFlip,
    setting: FlipSetting,
    items: NodeListOf<HTMLElement> | HTMLElement[]
  ) {
    super(inBlock, app, setting);

    // Second wrapper to HTML page
    this.wrapper.insertAdjacentHTML(
      "afterbegin",
      '<div class="stf__block"></div>'
    );

    const distElement = inBlock.querySelector<HTMLElement>(".stf__block");
    if (distElement === null) {
      throw new Error(`distElement is null ${inBlock}`);
    }
    this.distElement = distElement;

    this.items = items;
    items.forEach((item) => {
      distElement.appendChild(item);
    });

    this.setHandlers();
  }

  public clear(): void {
    this.items.forEach((item) => this.parentElement.appendChild(item));
  }

  /**
   * Update page list from HTMLElements
   *
   * @param {(NodeListOf<HTMLElement>|HTMLElement[])} items - List of pages as HTML Element
   */
  public updateItems(items: NodeListOf<HTMLElement> | HTMLElement[]): void {
    this.removeHandlers();

    if (this.distElement) {
      this.distElement.innerHTML = "";
    }

    items.forEach((item) => {
      this.distElement?.appendChild(item);
    });

    this.items = items;

    this.setHandlers();
  }

  public update(): void {
    this.app.getRender().update();
  }
}
