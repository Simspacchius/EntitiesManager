import { makeAutoObservable, runInAction } from "mobx";
import { Site, SiteFormValues } from "../models/site";
import agent from "../api/agent";

export default class SiteStore {
  siteRegistry = new Map<number, Site>();
  selectedSite?: Site = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get sites() {
    return Array.from(this.siteRegistry.values());
  }

  loadSites = async (parentId: number) => {
    try {
      const sites = await agent.Sites.list(parentId);
      runInAction(() => {
        sites.forEach((site) => {
          this.setSite(site);
        });
        this.sortSites();
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadSite = async (id: number) => {
    let site = this.getSite(id);
    if (site) {
      this.selectedSite = site;
      return site;
    } else {
      try {
        site = await agent.Sites.details(id);
        if (site) {
          runInAction(() => {
            this.setSite(site!);
            this.sortSites();
            this.selectedSite = site;
          });
        }
        return site;
      } catch (error) {
        console.log(error);
      }
    }
  };

  createSite = async (site: SiteFormValues) => {
    try {
      const newSite: Site = await agent.Sites.create(site);
      runInAction(() => {
        this.siteRegistry.set(newSite.id, newSite);
        this.sortSites();
        this.selectedSite = newSite;
      });
      return newSite.id;
    } catch (error) {
       console.log(error);
    }
  };

  updateSite = async (id: number, site: SiteFormValues) => {
    try {
      const updatedSite: Site = await agent.Sites.update(
        id,
        site
      );
      runInAction(() => {
        this.siteRegistry.set(updatedSite.id, updatedSite);
        this.sortSites();
        this.selectedSite = updatedSite;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteSite = async (id: number) => {
    try {
      await agent.Sites.delete(id);
      runInAction(() => {
        this.siteRegistry.delete(id);
        this.sortSites();
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setSite = (site: Site) => {
    this.siteRegistry.set(site.id, site);
  };

  private getSite = (id: number) => {
    return this.siteRegistry.get(id);
  };

  private sortSites = () => {
    const sortedSites = this.sites.sort((a, b) => b.id - a.id);
    sortedSites.forEach((site) => {
      this.setSite(site);
    });
  };
}