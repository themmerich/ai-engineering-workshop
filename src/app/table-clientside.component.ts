import { AfterViewInit, Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Table, TableModule, TableRowReorderEvent } from 'primeng/table';
import { BabsTranslatePipe } from '@babs/babs-frontend-shared/lib/jhipster-migration/babs-translate.pipe';
import { ButtonDirective } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, DecimalPipe, NgClass, SlicePipe } from '@angular/common';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { HasAnyAuthorityDirective } from '@babs/babs-frontend-shared/lib/auth/has-any-authority.directive';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { BooleanFormatterPipe, SwitchValueFormatterPipe } from '@babs/babs-frontend-shared/lib/formatting/boolean-formatter.pipe';
import {
    DokumentKategorie,
    DokumentStatus,
    DokumentVariante,
    DokumentVorlagenart,
} from '../../../../../../apps/babs-frontend-int/src/app/entities/dms/dms.model';
import { FilterService } from 'primeng/api';
import { ListColumnFilterComponent } from '@components/list-column-filter/list-column-filter.component';
import { TableTagValueComponent } from '@components/table-tag-value/table-tag-value.component';
import { NameFormatterPipe } from '../../../../../../apps/babs-frontend-int/src/app/shared/formatting/name-formatter.pipe';
import { faqKategorien, faqZielgruppen } from '../../../../../../apps/babs-frontend-int/src/app/entities/faq/faq.model';
import { TableChipValueComponent } from '@components/table-chip-value/table-chip-value.component';
import { WechselArt } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/wechsel-art';
import { BabsTranslateDirective } from '@babs/babs-frontend-shared/lib/jhipster-migration/babs-translate';
import { NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PlatzStatus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/platz-status';
import { PlatzKategorie } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/platz-kategorie';
import { RegelStatus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/regel-status';
import { Rollen } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/rollen';
import { EinsatzortStatus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/einsatzort-status';
import { DolmetscherStatus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/dolmetscher-status';
import { TerminTyp } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/termin-typ';
import { RegelKategorie } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/regel-kategorie';
import { isBitValue, isBooleanValue } from '../../../../../../apps/babs-frontend-int/src/app/entities/regel/regel.model';
import { NewsStatus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/news-status';
import { NEWS_ROLES } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/news-roles';
import { StripHtmlPipe } from '@babs/babs-frontend-shared/lib/formatting/strip-html.pipe';
import { Uebersetzungsrichtung } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/externe-sprachen';
import { LanguageFormatterPipe } from '@babs/babs-frontend-shared/lib/formatting/language-formatter.pipe';
import { SprachePipe } from '@babs/babs-frontend-shared/lib/formatting/sprache.pipe';
import { Tooltip } from 'primeng/tooltip';
import { Ripple } from 'primeng/ripple';
import { WiedervorlageGrund } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/wiedervorlage-grund';
import { WiedervorlageModus } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/wiedervorlage-modus';
import { WiedervorlageStand } from '../../../../../../apps/babs-frontend-int/src/app/domains/zentrale-steuerungen/model/wiedervorlage-stand';

type Column = {
    field: string;
    header: string;
    type: string;
    sort: boolean;
    show: boolean;
};

@Component({
    selector: 'babs-table-clientside',
    templateUrl: './table-clientside.component.html',
    styleUrls: ['./table-clientside.component.scss'],
    providers: [NameFormatterPipe, AsyncPipe, SwitchValueFormatterPipe, BooleanFormatterPipe],
    imports: [
        TableModule,
        BabsTranslatePipe,
        ButtonDirective,
        MultiSelect,
        FormsModule,
        NgClass,
        IconField,
        InputIcon,
        InputText,
        HasAnyAuthorityDirective,
        RouterLink,
        ListColumnFilterComponent,
        TableTagValueComponent,
        TableChipValueComponent,
        AsyncPipe,
        NameFormatterPipe,
        DatePipe,
        BabsTranslateDirective,
        NgbTooltip,
        DecimalPipe,
        TranslatePipe,
        StripHtmlPipe,
        LanguageFormatterPipe,
        SprachePipe,
        Tooltip,
        SlicePipe,
        NgbPopover,
        Ripple,
    ],
})
export class TableClientsideComponent implements OnInit, AfterViewInit {
    private readonly translateService = inject(TranslateService);
    private readonly filterService = inject(FilterService);
    private readonly switchValueFormatterPipe = inject(SwitchValueFormatterPipe);
    private readonly booleanFormatterPipe = inject(BooleanFormatterPipe);
    private readonly babsSprachePipe = inject(SprachePipe);
    private readonly babsLanguagePipe = inject(LanguageFormatterPipe);

    readonly data = input.required<any>();
    readonly columns = input.required<Column[]>();
    readonly internalData = computed(() => this.formatRawData(this.data(), this.columns()));
    readonly internalColumns = signal<Column[]>([]);
    readonly internalSelectedColumns = signal<Column[]>([]);
    readonly exportFilename = input('');
    readonly scrollHeight = input<string>('flex');
    readonly id = input<string>('p-table');
    readonly columnLength = computed(() => this.getColumnLength());

    readonly rowGroupMode = input<'subheader' | 'rowspan' | null>(null);
    readonly groupRowsBy = input<string>('');

    readonly showView = input(false);
    readonly showEdit = input(false);
    readonly showDelete = input(false);
    readonly showAdd = input(false);
    readonly showViewMitarbeiter = input(false);
    readonly showHistory = input(false);
    readonly showSearch = input(true);
    readonly showColumnToggle = input(true);
    readonly showLocations = input(false);
    readonly showDownload = input(false);
    readonly showFile = input(false);
    readonly showAssign = input(false);
    readonly showAssignUser = input(false);
    readonly showRemoveUser = input(false);
    readonly showActivate = input(false);
    readonly showDeactivate = input(false);

    readonly canReorder = input(false);
    readonly isReadOnly = input(false);
    readonly stateKey = input.required<string>();
    readonly emptyMsg = input('');
    readonly view = output<any>();
    readonly viewMitarbeiter = output<any>();
    readonly viewDokumentenhistorie = output<any>();
    readonly edit = output<any>();
    readonly add = output<any>();
    readonly delete = output<any>();
    readonly history = output<any>();
    readonly locations = output<any>();
    readonly download = output<any>();
    readonly file = output<any>();
    readonly reorder = output<any>();
    readonly assign = output<any>();
    readonly assignUser = output<any>();
    readonly removeUser = output<any>();
    readonly activate = output<any>();
    readonly deactivate = output<any>();

    readonly selectedRow = signal<any>(null);
    readonly globalFilterValue = signal<string>('');
    readonly globalFilterColumns = computed(() => this.internalSelectedColumns().map((column) => column.field));
    readonly buttonsByCondition = input('');
    readonly inTerminKontext = computed(() => this.buttonsByCondition() === 'termin');

    einsatzortStatusListTemp = Object.values(EinsatzortStatus);
    einsatzortStatusList = this.einsatzortStatusListTemp.map((status) => this.translateService.instant('babsappApp.einsatzort.status2.' + status));
    regelListTemp = Object.values(RegelKategorie);
    regelList = this.regelListTemp.map((status) => this.translateService.instant('babsappApp.RegelKategorie.' + status));
    statusListTemp = Object.values(DolmetscherStatus);
    statusList = this.statusListTemp.map((status) => this.translateService.instant('babsappApp.DolmetscherStatus.' + status));
    dmsStatusTemp = Object.values(DokumentStatus);
    dmsStatus = this.dmsStatusTemp.map((status) => this.translateService.instant('babsappApp.dms.maps.status.' + status));
    dmsKategorieTemp = Object.values(DokumentKategorie);
    dmsKategorie = this.dmsKategorieTemp.map((status) => this.translateService.instant('babsappApp.dms.maps.kategorie.' + status));
    dmsVarianteTemp = Object.values(DokumentVariante);
    dmsVariante = this.dmsVarianteTemp.map((status) => this.translateService.instant('babsappApp.dms.maps.variante.' + status));
    dmsArtTemp = Object.values(DokumentVorlagenart);
    dmsArt = this.dmsArtTemp.map((status) => this.translateService.instant('babsappApp.dms.maps.vorlagenarten.' + status));
    faqKategorienTemp = faqKategorien.map((item) => item.key);
    faqKategorien = this.faqKategorienTemp.map((status) => this.translateService.instant('babsappApp.fAQ.faqKategorien.' + status));
    faqZielgruppenTemp = Object.values(faqZielgruppen);
    faqZielgruppen = this.faqZielgruppenTemp.map((status) => this.translateService.instant('babsappApp.fAQ.faqZielgruppen.' + status));
    newsStatusTemp = Object.values(NewsStatus);
    newsStatus = this.newsStatusTemp.map((status) => this.translateService.instant('babsappApp.news.status.' + status));
    newsZielgruppenTemp = NEWS_ROLES.map((item) => item.key);
    newsZielgruppen = this.newsZielgruppenTemp.map((status) => this.translateService.instant('babsappApp.news.roles.' + status));
    terminTypListTemp = Object.values(TerminTyp);
    terminTypList = this.terminTypListTemp.map((status) => this.translateService.instant('babsappApp.TerminTyp.' + status));
    wechselArtTemp = Object.values(WechselArt);
    wechselArt = this.wechselArtTemp.map((status) => this.translateService.instant('babsappApp.personenprofilWechsel.wechselArt.' + status));
    platzStatusTemp = Object.values(PlatzStatus);
    platzStatus = this.platzStatusTemp.map((status) => this.translateService.instant('babsappApp.PlatzStatus.' + status));
    platzKategorieTemp = Object.values(PlatzKategorie);
    platzKategorie = this.platzKategorieTemp.map((kategorie) => this.translateService.instant('babsappApp.PlatzKategorie.' + kategorie));
    regelStatusTemp = Object.values(RegelStatus);
    regelStatus = this.regelStatusTemp.map((status) => this.translateService.instant('babsappApp.regel.aktiviertNeu.' + status));
    mitarbeiterRollenTemp = Object.values(Rollen);
    mitarbeiterRollen = this.mitarbeiterRollenTemp.map((rolle) => this.translateService.instant('babsappApp.mitarbeiter.roles.' + rolle));
    uebersetzungsRichtungTemp = Object.values(Uebersetzungsrichtung);
    uebersetzungsRichtung = this.uebersetzungsRichtungTemp.map((richtung) =>
        this.translateService.instant('babsappApp.dolmetscherBuro.uebersetzungsrichtungen.' + richtung)
    );
    wiedervorlageGrundTemp = Object.values(WiedervorlageGrund);
    wiedervorlageGrund = this.wiedervorlageGrundTemp.map((grund) => this.translateService.instant('babsappApp.wiedervorlage.reason.' + grund));
    wiedervorlageModusTemp = Object.values(WiedervorlageModus);
    wiedervorlageModus = this.wiedervorlageModusTemp.map((modus) => this.translateService.instant('babsappApp.wiedervorlage.wvView.modus.' + modus));
    wiedervorlageStandTemp = Object.values(WiedervorlageStand);
    wiedervorlageStand = this.wiedervorlageStandTemp.map((stand) => this.translateService.instant('babsappApp.wiedervorlage.wvView.stand.' + stand));
    profilTypenTemp = ['PP', 'BI', 'ED', 'BD'];
    profilTypen = this.profilTypenTemp.map((typ) => this.translateService.instant('babsappApp.ProfilTyp.' + typ));

    ngOnInit() {
        // init custom filters
        this.registerCustomFilter();

        // init current selected columns
        const storedColumns = localStorage.getItem(this.stateKey() + '-columns');
        if (storedColumns) {
            this.internalSelectedColumns.set(JSON.parse(storedColumns));
        } else {
            const col = this.columns().filter((c) => c.show);
            for (const c of col) {
                c.header = this.translateService.instant(c.header);
            }
            this.internalSelectedColumns.set(col);
        }

        // init list of available columns
        const col2 = [...this.columns()];
        for (const c of col2) {
            c.header = this.translateService.instant(c.header);
        }
        this.internalColumns.set(col2);
    }

    ngAfterViewInit() {
        // restore stored global filter
        const storedFilters = JSON.parse(localStorage.getItem(this.stateKey()));
        if (!storedFilters) {
            return;
        }

        if (storedFilters.filters?.global?.value !== null) {
            this.globalFilterValue.set(storedFilters.filters?.global?.value);
        }
    }

    onEdit(event: any) {
        this.selectedRow.set(event.data);
        this.edit.emit(event);
    }

    onView(event: any) {
        this.selectedRow.set(event.data);
        this.view.emit(event);
    }

    onViewMitarbeiter(event: any) {
        this.selectedRow.set(event.data);
        this.viewMitarbeiter.emit(event);
    }

    onAdd(event: any) {
        this.add.emit(event);
    }

    onDelete(event: any) {
        this.delete.emit(event);
    }

    onHistory(event: any) {
        this.history.emit(event);
    }

    onLocations(event: any) {
        this.locations.emit(event);
    }

    onDownload(event: any) {
        this.download.emit(event);
    }

    onFile(event: any) {
        this.file.emit(event);
    }

    onAssign(event: any) {
        this.selectedRow.set(event.data);
        this.assign.emit(event);
    }

    onAssignUser(event: any) {
        this.assignUser.emit(event);
    }

    onRemoveUser(event: any) {
        this.removeUser.emit(event);
    }

    onReorder(event: TableRowReorderEvent) {
        this.reorder.emit(event);
    }

    onColumnsChange(event: any) {
        localStorage.setItem(this.stateKey() + '-columns', JSON.stringify(event));
    }

    onActivate(event: any) {
        this.selectedRow.set(event.data);
        this.activate.emit(event);
    }

    onDeactivate(event: any) {
        this.selectedRow.set(event.data);
        this.deactivate.emit(event);
    }

    getColumnLength() {
        let additionalLength = 0;
        if (
            this.showEdit() ||
            this.showHistory() ||
            this.showDownload() ||
            this.showAdd() ||
            this.showAssign() ||
            this.showDelete() ||
            this.showLocations() ||
            this.showActivate() ||
            this.showDeactivate()
        ) {
            additionalLength++;
        }
        return this.internalSelectedColumns().length + additionalLength;
    }

    getEinsatzortSeverity(status: string): 'success' | 'danger' {
        if (status === this.translateService.instant('babsappApp.einsatzort.status2.AKTIVIERT')) {
            return 'success';
        } else if (status === this.translateService.instant('babsappApp.einsatzort.status2.DEAKTIVIERT')) {
            return 'danger';
        } else {
            return null;
        }
    }

    getDmsSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
        if (status === this.translateService.instant('babsappApp.dms.maps.status.HISTORISIERT')) {
            return 'danger';
        } else if (status === this.translateService.instant('babsappApp.dms.maps.status.ENTWURF_ANGELEGT')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.dms.maps.status.ZUKUENFTIGE_VERSION_ANGELEGT')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.dms.maps.status.AKTIV')) {
            return 'success';
        } else {
            return null;
        }
    }

    getTerminSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
        if (status === this.translateService.instant('babsappApp.TerminTyp.BLOCKER')) {
            return 'danger';
        } else if (status === this.translateService.instant('babsappApp.TerminTyp.BEDARF')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.TerminTyp.EINSATZ')) {
            return 'success';
        } else {
            return null;
        }
    }

    getRegelSeverity(status: string): 'success' | 'danger' {
        if (status === this.translateService.instant('babsappApp.regel.aktiviertNeu.true')) {
            return 'success';
        } else if (status === this.translateService.instant('babsappApp.regel.aktiviertNeu.false')) {
            return 'danger';
        } else {
            return null;
        }
    }

    getPlatzStatusSeverity(status: string): 'success' | 'danger' {
        if (status === this.translateService.instant('babsappApp.PlatzStatus.BEREIT')) {
            return 'success';
        } else if (status === this.translateService.instant('babsappApp.PlatzStatus.IN_WARTUNG')) {
            return 'danger';
        } else {
            return null;
        }
    }

    getVorlagenStandSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
        if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.LIEGT_NICHT_VOR')) {
            return 'danger';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.ERSTE_ERINNERUNG')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.ZWEITE_ERINNERUNG')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.OFFEN')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.VERSENDET')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.ANGEFRAGT')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.EINGELEITET')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.LIEGT_VOR')) {
            return 'success';
        } else {
            return null;
        }
    }

    getNewsSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
        if (status === this.translateService.instant('babsappApp.news.status.GELOESCHT')) {
            return 'danger';
        } else if (status === this.translateService.instant('babsappApp.news.status.INAKTIV')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.news.status.BEVORSTEHEND')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.news.status.ABGELAUFEN')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.news.status.AKTIV')) {
            return 'success';
        } else {
            return null;
        }
    }

    getMitarbeiterSeverity(status: boolean): 'success' | 'danger' {
        if (status) {
            return 'success';
        } else {
            return 'danger';
        }
    }

    getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        if (status === this.translateService.instant('babsappApp.DolmetscherStatus.INAKTIV')) {
            return 'warn';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.GELOESCHT')) {
            return 'contrast';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.NICHT_EINSETZBAR')) {
            return 'danger';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.IN_WIEDERVORLAGE')) {
            return 'success';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.UEBERPRUEFT_UND_GEEIGNET')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.WIRD_UEBERPRUEFT')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.IN_BEWERBUNG')) {
            return 'info';
        } else if (status === this.translateService.instant('babsappApp.DolmetscherStatus.AKKREDITIERT')) {
            return 'success';
        } else {
            return null;
        }
    }

    clearFilters(table: Table) {
        table.clear();
        this.globalFilterValue.set('');
        localStorage.removeItem(this.stateKey());
    }

    getFieldValue(row: any, field: string): any {
        return field.split('.').reduce((acc, part) => acc?.[part], row);
    }

    isDropdownRegel(row: any) {
        return ['WARTUNG'].includes(this.getFieldValue(row, 'schluessel'));
    }

    isBooleanRegel(row: any) {
        return isBooleanValue.includes(this.getFieldValue(row, 'schluessel'));
    }

    isBitRegel(row: any) {
        return isBitValue.includes(this.getFieldValue(row, 'schluessel'));
    }

    registerCustomFilter() {
        this.filterService.register('arrayContains', (value: string[], filter: string[]): boolean => {
            if (!filter || filter.length === 0) {
                return true;
            }
            if (!value || value.length === 0) {
                return false;
            }
            return filter.every((filterValue) => value.includes(filterValue));
        });

        this.filterService.register('categoryContains', (value: string[], filter: string[]): boolean => {
            if (!filter || filter.length === 0) {
                return true;
            }
            if (!value || value.length === 0) {
                return false;
            }
            return filter.every((filterValue) => value.some((val) => val === filterValue));
        });

        this.filterService.register('zielgruppeContains', (value: string[], filter: string[]): boolean => {
            if (!filter || filter.length === 0) {
                return true;
            }
            if (!value || value.length === 0) {
                return false;
            }
            return filter.every((filterValue) => value.some((val) => val === filterValue));
        });
    }

    formatRawData(rawData: any, columns: Column[]) {
        const rows = rawData as any[];
        const data = rawData?.length ? [rawData?.length] : [];

        if (!Array.isArray(rows)) {
            return;
        }

        rows?.forEach((row, rowIndex) => {
            const newRow = {};
            columns.forEach((column) => {
                if (column.type === 'status') {
                    newRow[column.field] = this.translateService.instant('babsappApp.DolmetscherStatus.' + row[column.field]);
                } else if (column.type === 'status_einsatzort') {
                    newRow[column.field] = this.translateService.instant('babsappApp.einsatzort.status2.' + row[column.field]);
                    newRow['einsatzortStatusValue'] = row[column.field];
                    newRow['laengengrad'] = row['laengengrad'];
                    newRow['breitengrad'] = row['breitengrad'];
                    newRow['kommentar'] = row['kommentar'];
                    newRow['erlaubteSonderEinsatzarten'] = row['erlaubteSonderEinsatzarten'];
                } else if (column.type === 'status_externer_einsatzort') {
                    newRow[column.field] = this.translateService.instant('babsappApp.jva.status2.' + row[column.field]);
                    newRow['einsatzortStatusValue'] = row[column.field];
                    newRow['laengengrad'] = row['laengengrad'];
                    newRow['breitengrad'] = row['breitengrad'];
                    newRow['auswaehlbareEinsatzarten'] = row['auswaehlbareEinsatzarten'];
                } else if (column.type === 'news_status') {
                    const news_status = row[column.field] as any[];
                    newRow['newsStatusValue'] = news_status;
                    newRow[column.field] = this.translateService.instant('babsappApp.news.status.' + news_status);
                } else if (column.type === 'termin_typ') {
                    newRow[column.field] = this.translateService.instant('babsappApp.TerminTyp.' + row[column.field]);
                } else if (column.type === 'dms_status') {
                    newRow[column.field] = this.translateService.instant('babsappApp.dms.maps.status.' + row[column.field]);
                } else if (column.type === 'dms_name') {
                    newRow[column.field] = this.translateService.instant('babsappApp.dms.maps.dokumentenname.' + row[column.field]);
                } else if (column.type === 'dms_kategorie') {
                    newRow[column.field] = [this.translateService.instant('babsappApp.dms.maps.kategorie.' + row[column.field])];
                } else if (column.type === 'regel_kategorie') {
                    newRow['kategorieValue'] = row[column.field];
                    newRow[column.field] = this.translateService.instant('babsappApp.RegelKategorie.' + row[column.field]);
                } else if (column.type === 'uebersetzung_uebersetzungsrichtung') {
                    newRow['uebersetzungsrichtungValue'] = row[column.field];
                    newRow[column.field] = this.translateService.instant('babsappApp.dolmetscherBuro.uebersetzungsrichtungen.' + row[column.field]);
                } else if (column.type === 'platz_kategorie') {
                    newRow['kategorieValue'] = row[column.field];
                    newRow[column.field] = this.translateService.instant('babsappApp.PlatzKategorie.' + row[column.field]);
                } else if (column.type === 'platz_status') {
                    newRow['statusValue'] = row[column.field];
                    newRow[column.field] = this.translateService.instant('babsappApp.PlatzStatus.' + row[column.field]);
                } else if (column.type === 'wechsel_art') {
                    newRow[column.field] = this.translateService.instant(
                        'babsappApp.personenprofilWechsel.wechselArt.' + this.getFieldValue(row, column.field)
                    );
                    newRow['showWartezeitInfo'] = row['showWartezeitInfo'];
                } else if (column.type === 'mitarbeiter_rollen') {
                    const mitarbeiter_rollen = row[column.field] as { rolle: string }[];
                    newRow[column.field] = mitarbeiter_rollen.map((rolle) => this.translateService.instant('babsappApp.mitarbeiter.roles.' + rolle.rolle));
                } else if (column.type === 'news_rollen') {
                    const news_rollen = row[column.field] as any[];
                    newRow[column.field] = news_rollen.map((rolle) => this.translateService.instant('babsappApp.news.roles.' + rolle));
                    newRow['anleser'] = row['anleser'];
                    newRow['text'] = row['text'];
                    newRow['rollenValue'] = news_rollen;
                } else if (column.type === 'faq_kategorie') {
                    const faq_kat = row['faqKategories'] as any[];
                    newRow['faqKategoriesValue'] = faq_kat.map((kategorie) =>
                        this.translateService.instant('babsappApp.fAQ.faqKategorien.' + kategorie.kategorie)
                    );
                    newRow['faqKategories'] = faq_kat;
                } else if (column.type === 'faq_zielgruppe') {
                    const faq_ziel = row['faqZielgruppes'] as any[];
                    newRow['faqZielgruppesValue'] = faq_ziel.map((zielgruppe) =>
                        this.translateService.instant('babsappApp.fAQ.faqZielgruppen.' + zielgruppe['zielgruppenTyp'])
                    );
                    newRow['faqZielgruppes'] = faq_ziel;
                } else if (column.type === 'dms_vorlagenart') {
                    const vorlagenart = row[column.field] as string[];
                    newRow[column.field] = vorlagenart.map((art) => this.translateService.instant('babsappApp.dms.maps.vorlagenarten.' + art));
                } else if (column.type === 'dms_variante') {
                    const varianten = row[column.field] as string[];
                    newRow[column.field] = varianten.map((variante) => this.translateService.instant('babsappApp.dms.maps.variante.' + variante));
                } else if (column.type === 'orgEinheit') {
                    newRow[column.field] = row['organisationsEinheitReferat'] + ' - ' + row['organisationsEinheitName'];
                    newRow['organisationsEinheitId'] = row['organisationsEinheitId'];
                } else if (column.type === 'faq_mitarbeiter') {
                    newRow[column.field] = row[column.field];
                    newRow['mitarbeiterVorname'] = row['mitarbeiterVorname'];
                    newRow['mitarbeiterLogin'] = row['mitarbeiterLogin'];
                    newRow['mitarbeiterId'] = row['mitarbeiterId'];
                } else if (column.type === 'erfasser') {
                    newRow[column.field] = row[column.field];
                    newRow['erfasserVorname'] = row['erfasserVorname'];
                    newRow['erfasserLogin'] = row['erfasserLogin'];
                    newRow['erfasserId'] = row['erfasserId'];
                } else if (column.type === 'aktiv_setzer') {
                    newRow['aktivSetzer'] =
                        `${row['aktivgesetztVonNachname'].toUpperCase()}, ${row['aktivgesetztVonVorname']} (${row['aktivgesetztVonLogin']})'`;
                } else if (column.type === 'entwurf_ersteller') {
                    newRow[column.field] = row[column.field];
                    newRow['entwurfErsteller'] =
                        `${row['entwurfErstelltVonNachname'].toUpperCase()}, ${row['entwurfErstelltVonVorname']} (${row['entwurfErstelltVonLogin']})'`;
                } else if (column.type === 'notiz_ersteller') {
                    newRow[column.field] = row[column.field];
                    newRow['benutzer'] = row['benutzer'];
                    newRow['name'] = row['name'];
                    newRow['dolmetscherBuroId'] = row['dolmetscherBuroId'];
                    newRow['dolmetscherId'] = row['dolmetscherId'];
                } else if (column.type === 'einsatzort') {
                    newRow[column.field] = row['einsatzortName'] + ' - ' + row['einsatzortNameErg'];
                    newRow['einsatzortId'] = row['einsatzortId'];
                } else if (column.type === 'einsatzort_lang') {
                    newRow[column.field] =
                        `${row['einsatzortName']} ${row['einsatzortNameErg']} - ${row['einsatzortStrasse']} ${row['einsatzortHausnummer']} [${row['einsatzortCode']}]`;
                    newRow['einsatzortId'] = row['einsatzortId'];
                    newRow['einsatzortName'] = row['einsatzortName'];
                    newRow['einsatzortNameErg'] = row['einsatzortNameErg'];
                    newRow['einsatzortStrasse'] = row['einsatzortStrasse'];
                    newRow['einsatzortHausnummer'] = row['einsatzortHausnummer'];
                    newRow['einsatzortCode'] = row['einsatzortCode'];
                } else if (column.type === 'einsatzort_ersteller') {
                    newRow[column.field] = row[column.field];
                    newRow['erstelltVonLogin'] = `${row['erstelltVonNachname']}, ${row['erstelltVonVorname']} (${row['erstelltVonLogin']})`;
                    newRow['erstelltVonId'] = row['erstelltVonId'];
                    newRow['erstelltVonNachname'] = row['erstelltVonNachname'];
                    newRow['erstelltVonVorname'] = row['erstelltVonVorname'];
                    newRow['erstellDatum'] = row['erstellDatum'];
                } else if (column.type === 'strasse_hausnummer') {
                    newRow['strasseValue'] = row['strasse'];
                    newRow[column.field] = `${row['strasse']} ${row['hausnummer']}`;
                } else if (column.type === 'regel_aktiv') {
                    newRow['aktivValue'] = row[column.field];
                    newRow[column.field] = this.translateService.instant('babsappApp.regel.aktiviertNeu.' + row[column.field]);
                } else if (column.type === 'inhaberBuroFirma') {
                    newRow[column.field] = row[column.field];
                    newRow['inhaberBuroId'] = row['inhaberBuroId'];
                } else if (column.type === 'wiedervorlagen_grund') {
                    newRow[column.field] = this.translateService.instant('babsappApp.wiedervorlage.reason.' + row[column.field]);
                } else if (column.type === 'wiedervorlagen_modus') {
                    newRow[column.field] = this.translateService.instant('babsappApp.wiedervorlage.wvView.modus.' + row[column.field]);
                } else if (column.type === 'wiedervorlagen_stand') {
                    newRow[column.field] = this.translateService.instant('babsappApp.wiedervorlage.wvView.stand.' + row[column.field]);
                } else if (column.type === 'vorlagen_gruende') {
                    const gruende = row[column.field] as string[];
                    newRow[column.field] = gruende.map((grund) => this.translateService.instant('babsappApp.vorlagen.grund.' + grund));
                } else if (column.type === 'wv_bemerkung') {
                    newRow[column.field] = row[column.field];
                    newRow['dolmetscherBuroId'] = row['dolmetscherBuroId'];
                } else if (column.type === 'vorlagen_stand') {
                    newRow[column.field] = this.translateService.instant('babsappApp.weiterevorlage.wvView.stand.' + row[column.field]);
                    newRow['dolmetscherId'] = row['dolmetscherId'];
                    newRow['bueroId'] = row['bueroId'];
                    newRow['inhaberId'] = row['inhaberId'];
                } else if (column.type === 'regel_wert') {
                    if (this.isBooleanRegel(row)) {
                        if (this.isBitRegel(row)) {
                            newRow[column.field] = this.switchValueFormatterPipe.transform(row[column.field]);
                        } else {
                            newRow[column.field] = this.booleanFormatterPipe.transform(row[column.field] === 'true');
                        }
                    } else if (this.isDropdownRegel(row)) {
                        newRow[column.field] = this.translateService.instant('babsappApp.regel.regeln.wartung.' + row[column.field]);
                    } else {
                        newRow[column.field] = row[column.field];
                    }
                    newRow['wertValue'] = row[column.field];
                    newRow['schluessel'] = row['schluessel'];
                } else if (column.type === 'sprache') {
                    const sprache = row[column.field];
                    const spracheAusgeschrieben = this.babsLanguagePipe.transform(this.babsSprachePipe.transform(sprache));
                    newRow['sprache'] = sprache;
                    newRow['spracheAusgeschrieben'] = spracheAusgeschrieben;
                } else {
                    newRow[column.field] = this.getFieldValue(row, column.field);
                }
            });
            newRow['version'] = row['version'];
            newRow['id'] = row['id'];
            data[rowIndex] = newRow;
        });
        return data;
    }
}
