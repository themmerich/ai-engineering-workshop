import { Component, inject, input } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Tooltip } from 'primeng/tooltip';
import { NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BabsTranslatePipe } from '@babs/babs-frontend-shared/lib/jhipster-migration/babs-translate.pipe';
import { BabsTranslateDirective } from '@babs/babs-frontend-shared/lib/jhipster-migration/babs-translate';
import { StripHtmlPipe } from '@babs/babs-frontend-shared/lib/formatting/strip-html.pipe';
import { LanguageFormatterPipe } from '@babs/babs-frontend-shared/lib/formatting/language-formatter.pipe';
import { SprachePipe } from '@babs/babs-frontend-shared/lib/formatting/sprache.pipe';
import { NameFormatterPipe } from '../../../../../../../apps/babs-frontend-int/src/app/shared/formatting/name-formatter.pipe';
import { TableTagValueComponent } from '@components/table-tag-value/table-tag-value.component';
import { TableChipValueComponent } from '@components/table-chip-value/table-chip-value.component';
import { Column } from '../table-column.model';
import { getFieldValue } from '../table-row-formatter';
import * as severity from '../table-severity';
import { Severity } from '../table-severity';

/**
 * Renders the body cell for one column of a `babs-table-clientside` row.
 *
 * Attribute selector so the host stays a real `<td>`, keeping the table DOM intact.
 * The two columns that previously carried a cell class (`boolean` → `text-center`,
 * `mitarbeiter_rollen` → `chips`) get it via host bindings.
 */
@Component({
  selector: 'td[babsTableCell]',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    NgClass,
    SlicePipe,
    RouterLink,
    TranslatePipe,
    Tooltip,
    NgbPopover,
    NgbTooltip,
    BabsTranslatePipe,
    BabsTranslateDirective,
    StripHtmlPipe,
    LanguageFormatterPipe,
    SprachePipe,
    NameFormatterPipe,
    TableTagValueComponent,
    TableChipValueComponent,
  ],
  host: {
    '[class.text-center]': "col().type === 'boolean'",
    '[class.chips]': "col().type === 'mitarbeiter_rollen'",
  },
  template: `
    @switch (col().type) {
      @case ('status') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getSeverity(rowData()[col().field])"
        />
      }
      @case ('status_einsatzort') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getEinsatzortSeverity(rowData()[col().field])"
        />
      }
      @case ('status_externer_einsatzort') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getEinsatzortSeverity(rowData()[col().field])"
        />
      }
      @case ('dms_status') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getDmsSeverity(rowData()[col().field])"
        />
      }
      @case ('termin_typ') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getTerminSeverity(rowData()[col().field])"
        />
      }
      @case ('news_status') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getNewsSeverity(rowData()[col().field])"
        />
      }
      @case ('regel_aktiv') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getRegelSeverity(rowData()[col().field])"
        />
      }
      @case ('platz_status') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getPlatzStatusSeverity(rowData()[col().field])"
        />
      }
      @case ('vorlagen_stand') {
        <babs-tag-value
          [value]="rowData()[col().field]"
          [severity]="getVorlagenStandSeverity(rowData()[col().field])"
        />
      }
      @case ('dms_vorlagenart') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('dms_variante') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('dms_kategorie') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('buero') {
        @if (getFieldValue(rowData(), 'inhaberBuroId')) {
          <a [routerLink]="['/dolmetscher-buro', getFieldValue(rowData(), 'inhaberBuroId')]">{{
            getFieldValue(rowData(), 'inhaberBuroFirma')
          }}</a>
        } @else if (getFieldValue(rowData(), 'dolmetscherBuroId')) {
          <a [routerLink]="['/dolmetscher-buro', getFieldValue(rowData(), 'dolmetscherBuroId')]">{{
            getFieldValue(rowData(), 'dolmetscherBuroFirma')
          }}</a>
        }
      }
      @case ('profiltyp') {
        <!--td>{{ 'babsappApp.ProfilTyp.' + getFieldValue(rowData(), col().field) | babsTranslate }}</td-->
        @if (getFieldValue(rowData(), col().field) === 'BI') {
          <i class="pi pi-building"></i>
        } @else if (getFieldValue(rowData(), col().field) === 'ED') {
          <i pTooltip="Einzeldolmetscher" class="pi pi-user"></i>
        } @else if (getFieldValue(rowData(), col().field) === 'BD') {
          <i pTooltip="Bürodolmetscher" class="pi pi-users"></i>
        } @else if (getFieldValue(rowData(), col().field) === 'BI_ED') {
          <i
            pTooltip="Büroinhaber Einzeldolmetscher"
            class="pi pi-building"
            style="margin-right: 0.25rem"
          ></i
          ><i pTooltip="Büroinhaber Einzeldolmetscher" class="pi pi-user"></i>
        } @else if (getFieldValue(rowData(), col().field) === 'BI_BD') {
          <i
            pTooltip="Büroinhaber Bürodolmetscher"
            class="pi pi-building"
            style="margin-right: 0.25rem"
          ></i
          ><i pTooltip="Büroinhaber Bürodolmetscher" class="pi pi-users"></i>
        }
      }
      @case ('faq_mitarbeiter') {
        @if (getFieldValue(rowData(), 'mitarbeiterId')) {
          <div
            [innerHTML]="
              getFieldValue(rowData(), 'mitarbeiterNachname')
                | babsNameFormatter
                  : getFieldValue(rowData(), 'mitarbeiterVorname')
                  : getFieldValue(rowData(), 'mitarbeiterLogin')
                  : getFieldValue(rowData(), 'mitarbeiterId')
                  : 'mitarbeiter'
                | async
            "
          ></div>
        }
      }
      @case ('notiz_ersteller') {
        @if (getFieldValue(rowData(), 'benutzer')) {
          <div
            [innerHTML]="
              getFieldValue(rowData(), 'name') + ' (' + getFieldValue(rowData(), 'benutzer') + ')'
            "
          ></div>
        }
      }
      @case ('erfasser') {
        @if (getFieldValue(rowData(), 'erfasserNachname')) {
          <div
            [innerHTML]="
              getFieldValue(rowData(), 'erfasserNachname')
                | babsNameFormatter
                  : getFieldValue(rowData(), 'erfasserVorname')
                  : getFieldValue(rowData(), 'erfasserLogin')
                  : getFieldValue(rowData(), 'erfasserId')
                  : 'mitarbeiter'
                | async
            "
          ></div>
        } @else {
          <div [innerHTML]="'BABS-SYSTEM'"></div>
        }
      }
      @case ('vorlagen_gruende') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('faq_kategorie') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('news_rollen') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('faq_zielgruppe') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('mitarbeiter_rollen') {
        <babs-chip-value [options]="rowData()[col().field]" />
      }
      @case ('einsatzort') {
        @if (getFieldValue(rowData(), 'einsatzortId')) {
          <a [routerLink]="['/einsatzort', getFieldValue(rowData(), 'einsatzortId')]">{{
            getFieldValue(rowData(), col().field)
          }}</a>
        } @else {
          {{ getFieldValue(rowData(), col().field) }}
        }
      }
      @case ('einsatzort_lang') {
        @if (getFieldValue(rowData(), 'einsatzortId')) {
          <a [routerLink]="['/einsatzort', getFieldValue(rowData(), 'einsatzortId')]">{{
            getFieldValue(rowData(), col().field)
          }}</a>
        } @else {
          {{ getFieldValue(rowData(), col().field) }}
        }
      }
      @case ('vorlagen_dolmetscher') {
        @if (getFieldValue(rowData(), 'dolmetscherId')) {
          <a [routerLink]="['/personenprofil', getFieldValue(rowData(), 'dolmetscherId')]">{{
            getFieldValue(rowData(), col().field)
          }}</a>
        } @else {
          {{ getFieldValue(rowData(), col().field) }}
        }
      }
      @case ('vorlagen_buero') {
        @if (getFieldValue(rowData(), 'bueroId')) {
          <a [routerLink]="['/dolmetscher-buero', getFieldValue(rowData(), 'bueroId')]">{{
            getFieldValue(rowData(), col().field)
          }}</a>
        } @else {
          {{ getFieldValue(rowData(), col().field) }}
        }
      }
      @case ('vorlagen_inhaber') {
        @if (getFieldValue(rowData(), 'inhaberId')) {
          <a [routerLink]="['/dolmetscher-buero', getFieldValue(rowData(), 'inhaberId')]">{{
            getFieldValue(rowData(), col().field)
          }}</a>
        } @else {
          {{ getFieldValue(rowData(), col().field) }}
        }
      }
      @case ('orgEinheit') {
        @if (isReadOnly()) {
          {{ getFieldValue(rowData(), col().field) }}
        } @else {
          <a
            [routerLink]="[
              '/organisationseinheit',
              getFieldValue(rowData(), 'organisationsEinheitId'),
            ]"
            >{{ getFieldValue(rowData(), col().field) }}</a
          >
        }
      }
      @case ('mitarbeiter_status') {
        <babs-tag-value
          [value]="'babsappApp.mitarbeiter.status.' + rowData()[col().field] | translate"
          [severity]="getMitarbeiterSeverity(rowData()[col().field])"
        />
      }
      @case ('mitarbeiter_einsatzorte') {
        <div>
          @for (
            einsatzort of getFieldValue(rowData(), col().field) | slice: 0 : 29;
            track einsatzort;
            let isLast = $last
          ) {
            <span>
              @if (einsatzort['einsatzortStatus'] === 'DEAKTIVIERT') {
                <span
                  class="fa fa-fw fa-exclamation-circle text-danger"
                  aria-hidden="true"
                  placement="top"
                  [ngbPopover]="'babsappApp.einsatzort.deaktiviert' | babsTranslate"
                  triggers="mouseenter:mouseleave"
                ></span>
              }
              <span
                [ngbPopover]="einsatzort['name'] + ' ' + einsatzort['nameErg']"
                [popoverTitle]="einsatzort['code']"
                triggers="mouseenter:mouseleave"
                >{{ einsatzort['code'] }}</span
              >
              @if (!isLast) {
                <span>, </span>
              }
              @if (isLast && getFieldValue(rowData(), col().field).length > 29) {
                <span>...</span>
              }
            </span>
          }
        </div>
      }
      @case ('date_time') {
        {{ getFieldValue(rowData(), col().field) | date: 'EE dd.MM.yyyy HH:mm' }}
      }
      @case ('wechsel_date') {
        @if (rowData()['showWartezeitInfo']) {
          <span
            class="fa fa-exclamation-triangle"
            [style.color]="'red'"
            [ngbTooltip]="'babsappApp.personenprofilWechsel.home.wartezeitInfo' | babsTranslate"
          >
            <div class="sr-only">
              <span babsTranslate="global.terms.hinweis"></span>
              <span>:&nbsp;</span>
              <span babsTranslate="babsappApp.personenprofilWechsel.home.wartezeitInfo"></span>
            </div>
          </span>
        }
        {{ rowData()[col().field] | date }}
      }
      @case ('date') {
        {{ rowData()[col().field] | date }}
      }
      @case ('percentage') {
        {{ rowData()[col().field] | number: '1.1' }} %
      }
      @case ('boolean') {
        @if (rowData()[col().field]) {
          <i
            aria-label="ist ausgewaehlt"
            class="pi"
            [ngClass]="'text-green-500 pi-check-circle'"
          ></i>
        } @else {
          <i
            aria-label="ist nicht ausgewaehlt"
            class="pi"
            [ngClass]="'text-red-500 pi-times-circle'"
          ></i>
        }
      }
      @case ('email') {
        <a href="mailto:{{ getFieldValue(rowData(), col().field) }}">{{
          getFieldValue(rowData(), col().field)
        }}</a>
      }
      @case ('phone') {
        <a href="tel:{{ getFieldValue(rowData(), col().field) }}">{{
          getFieldValue(rowData(), col().field)
        }}</a>
      }
      @case ('currency_eur') {
        {{ rowData()[col().field] | number: '1.2-2' }} €
      }
      @case ('html') {
        {{ rowData()[col().field] }}
      }
      @case ('sprachen') {
        @for (sprache of getFieldValue(rowData(), col().field); track sprache; let isLast = $last) {
          <span [pTooltip]="tooltipContent" tooltipPosition="top">
            <ng-template #tooltipContent>
              <h1>{{ sprache | babsSprache | babsLanguage }}</h1>
              <p>{{ sprache | babsSprache: true }}</p>
            </ng-template>

            @if (!isLast) {
              <span>{{ sprache }}, </span>
            } @else {
              <span>{{ sprache }}</span>
            }
          </span>
        }
      }
      @case ('sprache') {
        {{ getFieldValue(rowData(), col().field) | babsSprache | babsLanguage }}
      }
      @case ('revision_typ') {
        {{ 'global.audit.' + rowData()[col().field] | translate }}
      }
      @default {
        {{ rowData()[col().field] | stripHtml }}
      }
    }
  `,
})
export class TableCellComponent {
  private readonly translateService = inject(TranslateService);

  readonly col = input.required<Column>();
  readonly rowData = input.required<any>();
  readonly isReadOnly = input(false);

  protected readonly getFieldValue = getFieldValue;

  getSeverity(status: string): Severity {
    return severity.getSeverity(this.translateService, status);
  }

  getEinsatzortSeverity(status: string): Severity {
    return severity.getEinsatzortSeverity(this.translateService, status);
  }

  getDmsSeverity(status: string): Severity {
    return severity.getDmsSeverity(this.translateService, status);
  }

  getTerminSeverity(status: string): Severity {
    return severity.getTerminSeverity(this.translateService, status);
  }

  getNewsSeverity(status: string): Severity {
    return severity.getNewsSeverity(this.translateService, status);
  }

  getRegelSeverity(status: string): Severity {
    return severity.getRegelSeverity(this.translateService, status);
  }

  getPlatzStatusSeverity(status: string): Severity {
    return severity.getPlatzStatusSeverity(this.translateService, status);
  }

  getVorlagenStandSeverity(status: string): Severity {
    return severity.getVorlagenStandSeverity(this.translateService, status);
  }

  getMitarbeiterSeverity(status: boolean): Severity {
    return severity.getMitarbeiterSeverity(status);
  }
}
