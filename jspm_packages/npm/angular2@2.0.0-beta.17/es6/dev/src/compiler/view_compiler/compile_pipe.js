/* */ 
"format esm";
import { isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import * as o from '../output/output_ast';
import { Identifiers, identifierToken } from '../identifiers';
import { injectFromViewParentInjector, createPureProxy, getPropertyInView } from './util';
class _PurePipeProxy {
    constructor(instance, argCount) {
        this.instance = instance;
        this.argCount = argCount;
    }
}
export class CompilePipe {
    constructor(view, name) {
        this.view = view;
        this._purePipeProxies = [];
        this.meta = _findPipeMeta(view, name);
        this.instance = o.THIS_EXPR.prop(`_pipe_${name}_${view.pipeCount++}`);
    }
    get pure() { return this.meta.pure; }
    create() {
        var deps = this.meta.type.diDeps.map((diDep) => {
            if (diDep.token.equalsTo(identifierToken(Identifiers.ChangeDetectorRef))) {
                return o.THIS_EXPR.prop('ref');
            }
            return injectFromViewParentInjector(diDep.token, false);
        });
        this.view.fields.push(new o.ClassField(this.instance.name, o.importType(this.meta.type), [o.StmtModifier.Private]));
        this.view.createMethod.resetDebugInfo(null, null);
        this.view.createMethod.addStmt(o.THIS_EXPR.prop(this.instance.name)
            .set(o.importExpr(this.meta.type).instantiate(deps))
            .toStmt());
        this._purePipeProxies.forEach((purePipeProxy) => {
            createPureProxy(this.instance.prop('transform').callMethod(o.BuiltinMethod.bind, [this.instance]), purePipeProxy.argCount, purePipeProxy.instance, this.view);
        });
    }
    call(callingView, args) {
        if (this.meta.pure) {
            var purePipeProxy = new _PurePipeProxy(o.THIS_EXPR.prop(`${this.instance.name}_${this._purePipeProxies.length}`), args.length);
            this._purePipeProxies.push(purePipeProxy);
            return getPropertyInView(o.importExpr(Identifiers.castByValue)
                .callFn([purePipeProxy.instance, this.instance.prop('transform')]), callingView, this.view)
                .callFn(args);
        }
        else {
            return getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
        }
    }
}
function _findPipeMeta(view, name) {
    var pipeMeta = null;
    for (var i = view.pipeMetas.length - 1; i >= 0; i--) {
        var localPipeMeta = view.pipeMetas[i];
        if (localPipeMeta.name == name) {
            pipeMeta = localPipeMeta;
            break;
        }
    }
    if (isBlank(pipeMeta)) {
        throw new BaseException(`Illegal state: Could not find pipe ${name} although the parser should have detected this error!`);
    }
    return pipeMeta;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC14QkxJQnJWUi50bXAvYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIvY29tcGlsZV9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsT0FBTyxFQUFZLE1BQU0sMEJBQTBCO09BQ3BELEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO09BQ3JELEtBQUssQ0FBQyxNQUFNLHNCQUFzQjtPQUdsQyxFQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUMsTUFBTSxnQkFBZ0I7T0FDcEQsRUFBQyw0QkFBNEIsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxRQUFRO0FBRXZGO0lBQ0UsWUFBbUIsUUFBd0IsRUFBUyxRQUFnQjtRQUFqRCxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0FBQzFFLENBQUM7QUFFRDtJQUtFLFlBQW1CLElBQWlCLEVBQUUsSUFBWTtRQUEvQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBRjVCLHFCQUFnQixHQUFxQixFQUFFLENBQUM7UUFHOUMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU5QyxNQUFNO1FBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcs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RUFBRSxJQUFZO0lBQ3BELElBQUksUUFBUSxHQUF3QixJQUFJLENBQUM7SUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQixRQUFRLEdBQUcsYUFBYSxDQUFDO1lBQ3pCLEtBQUssQ0FBQztRQUNSLENBQUM7SUFDSCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksYUFBYSxDQUNuQixzQ0FBc0MsSUFBSSx1REFBdUQsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtDb21waWxlVmlld30gZnJvbSAnLi9jb21waWxlX3ZpZXcnO1xuaW1wb3J0IHtDb21waWxlUGlwZU1ldGFkYXRhfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7SWRlbnRpZmllcnMsIGlkZW50aWZpZXJUb2tlbn0gZnJvbSAnLi4vaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtpbmplY3RGcm9tVmlld1BhcmVudEluamVjdG9yLCBjcmVhdGVQdXJlUHJveHksIGdldFByb3BlcnR5SW5WaWV3fSBmcm9tICcuL3V0aWwnO1xuXG5jbGFzcyBfUHVyZVBpcGVQcm94eSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnN0YW5jZTogby5SZWFkUHJvcEV4cHIsIHB1YmxpYyBhcmdDb3VudDogbnVtYmVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVBpcGUge1xuICBtZXRhOiBDb21waWxlUGlwZU1ldGFkYXRhO1xuICBpbnN0YW5jZTogby5SZWFkUHJvcEV4cHI7XG4gIHByaXZhdGUgX3B1cmVQaXBlUHJveGllczogX1B1cmVQaXBlUHJveHlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3OiBDb21waWxlVmlldywgbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhID0gX2ZpbmRQaXBlTWV0YSh2aWV3LCBuYW1lKTtcbiAgICB0aGlzLmluc3RhbmNlID0gby5USElTX0VYUFIucHJvcChgX3BpcGVfJHtuYW1lfV8ke3ZpZXcucGlwZUNvdW50Kyt9YCk7XG4gIH1cblxuICBnZXQgcHVyZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubWV0YS5wdXJlOyB9XG5cbiAgY3JlYXRlKCk6IHZvaWQge1xuICAgIHZhciBkZXBzID0gdGhpcy5tZXRhLnR5cGUuZGlEZXBzLm1hcCgoZGlEZXApID0+IHtcbiAgICAgIGlmIChkaURlcC50b2tlbi5lcXVhbHNUbyhpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuQ2hhbmdlRGV0ZWN0b3JSZWYpKSkge1xuICAgICAgICByZXR1cm4gby5USElTX0VYUFIucHJvcCgncmVmJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5qZWN0RnJvbVZpZXdQYXJlbnRJbmplY3RvcihkaURlcC50b2tlbiwgZmFsc2UpO1xuICAgIH0pO1xuICAgIHRoaXMudmlldy5maWVsZHMucHVzaChuZXcgby5DbGFzc0ZpZWxkKHRoaXMuaW5zdGFuY2UubmFtZSwgby5pbXBvcnRUeXBlKHRoaXMubWV0YS50eXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbby5TdG10TW9kaWZpZXIuUHJpdmF0ZV0pKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlTWV0aG9kLnJlc2V0RGVidWdJbmZvKG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChvLlRISVNfRVhQUi5wcm9wKHRoaXMuaW5zdGFuY2UubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoby5pbXBvcnRFeHByKHRoaXMubWV0YS50eXBlKS5pbnN0YW50aWF0ZShkZXBzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0bXQoKSk7XG4gICAgdGhpcy5fcHVyZVBpcGVQcm94aWVzLmZvckVhY2goKHB1cmVQaXBlUHJveHkpID0+IHtcbiAgICAgIGNyZWF0ZVB1cmVQcm94eShcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLnByb3AoJ3RyYW5zZm9ybScpLmNhbGxNZXRob2Qoby5CdWlsdGluTWV0aG9kLmJpbmQsIFt0aGlzLmluc3RhbmNlXSksXG4gICAgICAgICAgcHVyZVBpcGVQcm94eS5hcmdDb3VudCwgcHVyZVBpcGVQcm94eS5pbnN0YW5jZSwgdGhpcy52aWV3KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGwoY2FsbGluZ1ZpZXc6IENvbXBpbGVWaWV3LCBhcmdzOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gICAgaWYgKHRoaXMubWV0YS5wdXJlKSB7XG4gICAgICB2YXIgcHVyZVBpcGVQcm94eSA9IG5ldyBfUHVyZVBpcGVQcm94eShcbiAgICAgICAgICBvLlRISVNfRVhQUi5wcm9wKGAke3RoaXMuaW5zdGFuY2UubmFtZX1fJHt0aGlzLl9wdXJlUGlwZVByb3hpZXMubGVuZ3RofWApLCBhcmdzLmxlbmd0aCk7XG4gICAgICB0aGlzLl9wdXJlUGlwZVByb3hpZXMucHVzaChwdXJlUGlwZVByb3h5KTtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eUluVmlldyhcbiAgICAgICAgICAgICAgICAgby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmNhc3RCeVZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbihbcHVyZVBpcGVQcm94eS5pbnN0YW5jZSwgdGhpcy5pbnN0YW5jZS5wcm9wKCd0cmFuc2Zvcm0nKV0pLFxuICAgICAgICAgICAgICAgICBjYWxsaW5nVmlldywgdGhpcy52aWV3KVxuICAgICAgICAgIC5jYWxsRm4oYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eUluVmlldyh0aGlzLmluc3RhbmNlLCBjYWxsaW5nVmlldywgdGhpcy52aWV3KS5jYWxsTWV0aG9kKCd0cmFuc2Zvcm0nLCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBfZmluZFBpcGVNZXRhKHZpZXc6IENvbXBpbGVWaWV3LCBuYW1lOiBzdHJpbmcpOiBDb21waWxlUGlwZU1ldGFkYXRhIHtcbiAgdmFyIHBpcGVNZXRhOiBDb21waWxlUGlwZU1ldGFkYXRhID0gbnVsbDtcbiAgZm9yICh2YXIgaSA9IHZpZXcucGlwZU1ldGFzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxvY2FsUGlwZU1ldGEgPSB2aWV3LnBpcGVNZXRhc1tpXTtcbiAgICBpZiAobG9jYWxQaXBlTWV0YS5uYW1lID09IG5hbWUpIHtcbiAgICAgIHBpcGVNZXRhID0gbG9jYWxQaXBlTWV0YTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoaXNCbGFuayhwaXBlTWV0YSkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYElsbGVnYWwgc3RhdGU6IENvdWxkIG5vdCBmaW5kIHBpcGUgJHtuYW1lfSBhbHRob3VnaCB0aGUgcGFyc2VyIHNob3VsZCBoYXZlIGRldGVjdGVkIHRoaXMgZXJyb3IhYCk7XG4gIH1cbiAgcmV0dXJuIHBpcGVNZXRhO1xufVxuIl19