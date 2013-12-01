package org.ase.peer_marker.transformer;

import com.google.common.base.Objects;
import com.tobykurien.sparkler.Helper;
import com.tobykurien.sparkler.db.DatabaseManager;
import java.util.Map;
import javax.sql.DataSource;
import org.eclipse.xtend2.lib.StringConcatenation;
import org.eclipse.xtext.xbase.lib.Exceptions;
import org.eclipse.xtext.xbase.lib.Functions.Function2;
import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.LazyList;
import org.javalite.activejdbc.Model;
import spark.Request;
import spark.Response;
import spark.ResponseTransformerRoute;

/**
 * Returns a JSON serialized version of Model objects
 */
@SuppressWarnings("all")
public class JsonTransformer extends ResponseTransformerRoute {
  private Function2<? super Request,? super Response,? extends Object> handler;
  
  public JsonTransformer(final String path, final Function2<? super Request,? super Response,? extends Object> handler) {
    super(path, "application/json");
    this.handler = handler;
  }
  
  public String render(final Object json) {
    return json.toString();
  }
  
  public String escapeString(final String s) {
    String _replace = s.replace("\'", "\\\'");
    return _replace;
  }
  
  public Object handle(final Request request, final Response response) {
    CharSequence _xblockexpression = null;
    {
      response.type("application/json");
      CharSequence _xtrycatchfinallyexpression = null;
      try {
        CharSequence _xblockexpression_1 = null;
        {
          DataSource _newDataSource = DatabaseManager.newDataSource();
          Base.open(_newDataSource);
          Object model = this.handler.apply(request, response);
          CharSequence _xifexpression = null;
          boolean _equals = Objects.equal(model, null);
          if (_equals) {
            String _xblockexpression_2 = null;
            {
              response.status(404);
              _xblockexpression_2 = ("{\'error\': \'Object not found\'}");
            }
            _xifexpression = _xblockexpression_2;
          } else {
            CharSequence _xifexpression_1 = null;
            if ((model instanceof Model)) {
              return ((Model) model).toJson(false);
            } else {
              CharSequence _xifexpression_2 = null;
              if ((model instanceof LazyList)) {
                return ((LazyList) model).toJson(false);
              } else {
                CharSequence _xifexpression_3 = null;
                if ((model instanceof Map)) {
                  String _string = ((Map) model).toString();
                  return this.escapeString(_string);
                } else {
                  CharSequence _xifexpression_4 = null;
                  boolean _equals_1 = Objects.equal(model, null);
                  if (_equals_1) {
                    _xifexpression_4 = null;
                  } else {
                    StringConcatenation _builder = new StringConcatenation();
                    _builder.append("{ \'result\': \'");
                    String _string_1 = model.toString();
                    String _escapeString = this.escapeString(_string_1);
                    _builder.append(_escapeString, "");
                    _builder.append("\' }");
                    _xifexpression_4 = _builder;
                  }
                  _xifexpression_3 = _xifexpression_4;
                }
                _xifexpression_2 = _xifexpression_3;
              }
              _xifexpression_1 = _xifexpression_2;
            }
            _xifexpression = _xifexpression_1;
          }
          _xblockexpression_1 = (_xifexpression);
        }
        _xtrycatchfinallyexpression = _xblockexpression_1;
      } catch (final Throwable _t) {
        if (_t instanceof Exception) {
          final Exception e = (Exception)_t;
          CharSequence _xblockexpression_2 = null;
          {
            String error = Helper.handleError(request, response, e);
            StringConcatenation _builder = new StringConcatenation();
            _builder.append("{\'error\': \'");
            String _escapeString = this.escapeString(error);
            _builder.append(_escapeString, "");
            _builder.append("\'}");
            _xblockexpression_2 = (_builder);
          }
          _xtrycatchfinallyexpression = _xblockexpression_2;
        } else {
          throw Exceptions.sneakyThrow(_t);
        }
      } finally {
        Base.close();
      }
      _xblockexpression = (_xtrycatchfinallyexpression);
    }
    return _xblockexpression;
  }
}
