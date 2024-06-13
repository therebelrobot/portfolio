import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Options } from './quartz/components/ExplorerNode';

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/therebelrobot/portfolio",
    },
  }),
}

const YEAR_REGEX = /^[0-9]{4}/;
const explorerOpts: Options = {
  useSavedState: false,
  order: ["sort", "map"],
  folderClickBehavior: "link",
  folderDefaultState: "collapsed",
  title: "Pages",
  sortFn: (a, b) => {

    const aIsYear = YEAR_REGEX.test(a.name);
    const bIsYear = YEAR_REGEX.test(b.name);
  
    if (aIsYear && bIsYear) {
      return Number(b.name.slice(0, 4)) - Number(a.name.slice(0, 4));
    }
  
    if (!aIsYear && !bIsYear) {
      return a.name.localeCompare(b.name);
    }
  
    return aIsYear ? -1 : 1;
  },
  mapFn: (node) => {
    const colonArray = node.displayName.split(":").map((s) => s.trim());
    node.displayName = colonArray[colonArray.length - 1].trim();

    const originalName = colonArray.join(":").trim();

    if (originalName.includes("Side Projects")) {
      node.displayName = `🛠️ ${node.displayName}`;
    }
    if (originalName.includes("Work Experience") || YEAR_REGEX.test(originalName)) {
      node.displayName = `💼 ${node.displayName}`;
    }
    if (originalName.includes("Blog")) {
      node.displayName = `📝 ${node.displayName}`;
    }
    if (originalName.includes("Volunteer")) {
      node.displayName = `🌱 ${node.displayName}`;
    }
  },
  filterFn: (node) => node.name !== "tags",
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(explorerOpts)),
  ],
  right: [
    Component.MobileOnly(Component.Explorer(explorerOpts)),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(explorerOpts)),
  ],
  right: [
    Component.MobileOnly(Component.Explorer(explorerOpts)),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
