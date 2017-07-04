

/* -----------------------------------
 *
 * Meta
 *
 * -------------------------------- */

export interface IMeta {
   owner?: TSDom;
}


/* -----------------------------------
 *
 * Events
 *
 * -------------------------------- */

export interface IEvents {
   type: string;
   handler: EventListener;
}


/* -----------------------------------
 *
 * TSDom
 *
 * -------------------------------- */

export class TSDom {


   [index: number]: HTMLElement;


   document: Document;
   meta: IMeta;
   regex: RegExp;
   length: number;
   events: IEvents[];


   public constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta) {

      let els: any;

      this.document = document;
      this.meta = meta || {};
      this.regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
      this.events = [];

      if(typeof qry === 'string') {

         els = this.query(qry, ctx ? ctx : document);

      } else {

         els = qry;

      }

      if (!els) return this

      if (els.nodeType === 1 || els === window) {
         
         this[0] = els;
         this.length = 1
    
      } else {

         for (
            let len = (this.length = els.length);
            len--;
            this[len] = els[len]
         );

      }

   }


   public find (qry: string) {

      return new TSDom(qry, this[0], { owner: this });

   }


   public each (cb: (el: HTMLElement) => void) {

      for(let i = 0, len = this.length; i < len;) {

         let el: HTMLElement = this[i];

         if(cb.call(this, this[i], i++) == false) {
            break;
         }

      }

      return this;

   }


   public css(obj: { [key: string]: string }) {

      const self = this;

      this.each(el => {

         for(let key in obj) {

            const val = obj[key];

            el.style.setProperty(key, val);

         }

      });

      return this;

   }


   public hasClass(str: string) {

      let result = false;

      this.each(el => {

         const value = ` ${str} `;
         const clean = (` ${el.className} `).replace(/[\n\t]/g, ' ');

         if(clean.indexOf(value) > -1) {

            result = true;

         }

      });

      return result;

   }


   public addClass(str: string) {

      this.each(el => {

         if(!this.hasClass(str)) {

            el.className += ' ' + str;

         }

      });

      return this;

   }


   public removeClass(str: string) {

      this.each(el => {

         if(this.hasClass(str)) {

            var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');

            el.className = el.className.replace(reg, ' ');

         }

      });

      return this;

   }


   public on (ev: string, cb: EventListener) {

      const self = this;

      this.each(el => {

         self.off(ev);

         el.addEventListener(ev, cb, false);

         self.events.push({
            type: ev,
            handler: cb
         });

      });

      return this;

   }

   
   public off (ev: string) {

      const self = this;
      const { events } = this; 

      this.each(el => {

         const active = this.findEvent(ev);

         if(active !== undefined) {

            el.removeEventListener(ev, active.handler, false);
            
         }

      });

      this.events = events.filter(function(evt) {
      
         return (evt.type !== ev);
      
      }, event);

      return this;

   }


   private query(qry: string, ctx: Element | Document) {

      const doc = this.document;

      let test;
      let match;

      if ((test = this.regex.exec(qry))) {

         if ((match = test[3])) {

            return ctx.getElementsByClassName(match);

         }

         if ((match = test[2])) {

            return ctx.getElementsByTagName(match);

         }

         if ((match = test[1])) {

            return doc.getElementById(match);

         }

      }

      return ctx.querySelectorAll(qry);

   }


   private findEvent(ev: string) {

      const { events } = this;

      return events.filter(function(_ev) {

         return (_ev.type === ev);

      }, ev)[0];

   }


}


/* -----------------------------------
 *
 * preventDefault
 *
 * -------------------------------- */

export function preventDefault(ev: Event) {

   if (ev.preventDefault) {

      return ev.preventDefault();
      
   }

   return ev.returnValue = false;

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => {

   return new TSDom(qry, ctx);
   
};